import * as BABYLON from 'babylonjs'
import Board from './board'
import { getHumanCoord } from './coordinateConverter'
import { boardSize } from './const'
import CanStream from './canStream'
import Piece from './piece'

export default class MyScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _ground: BABYLON.Mesh;
    private xrCamera: BABYLON.WebXRCamera;

    private currentlySelectedPiece: Piece;

    constructor (canvasElement: string) {
      // Create canvas and engine.
      this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement
      this._engine = new BABYLON.Engine(this._canvas, true)

      // Listen for browser/canvas resize events
      window.addEventListener('resize', () => {
        this._engine.resize()
      })
    }

    async createScene (): Promise<void> {
      // Setup
      this._scene = new BABYLON.Scene(this._engine)
      this._camera = new BABYLON.ArcRotateCamera('Camera', Math.PI, 1.1, 30, new BABYLON.Vector3(0, 0, 0), this._scene)
      this._camera.setTarget(BABYLON.Vector3.Zero())
      this._camera.attachControl(this._canvas, false)
      this._light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(0, 3, 0), this._scene);

      //this._scene.debugLayer.show();


      const board = new Board(this._scene)
      this.createGround()

      // Start stream
      const canStream = new CanStream()
      canStream.goUpdate(board)

      // Set up VR
      // Variabeln här som heter xr heter xrHelper i dokumentationen, men den som heter xrHelper här heter också xrHelper i andra delar av dokumentationen
      // De är båda helpers och används till olika saker, men en är legacy och en inte, men jag vet inte vilken T_T
      const xrHelper = await this._scene.createDefaultXRExperienceAsync({
        floorMeshes: [this._ground]
      })

      // Set up clicking on things
      //Om man kan se en pointer av valfritt slag (mus eller kontroll tex)
      
      this._scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            console.log('CLICKED AT X: ' + pointerInfo.event.x); 
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh) {
              console.log("Clicked a MESH")
              if (xrHelper.baseExperience.state === BABYLON.WebXRState.IN_XR) {
                const pointerInfoEvent = pointerInfo.event as PointerEvent // Det här är ett redigt fulhack för att TS är rädd att eventet också kan vara ett WheelEvent. Då kraschar detta.
                const xrInput = xrHelper.pointerSelection.getXRControllerByPointerId(pointerInfoEvent.pointerId)
                const motionController = xrInput.motionController
                
                if (motionController) {
                  const humanCoord = getHumanCoord(pointerInfo.pickInfo.pickedMesh.position)
                  console.log(humanCoord)
                  this.currentlySelectedPiece = board.getPiece(humanCoord)
                  console.log("Setting currentPiece", this.currentlySelectedPiece)
                  console.log("", humanCoord, board.getPiece(humanCoord));

                  pointerInfo.pickInfo.pickedMesh.setParent(motionController.rootMesh)
                  //this.currentlySelectedPiece.toggleSelect()
                }
              } else {
                // Här går non-XR support
              }
            }
            break

          case BABYLON.PointerEventTypes.POINTERUP:
            //this.currentlySelectedPiece.toggleSelect();
            console.log("REMOVING PARENT")
            const humanCoord = getHumanCoord(pointerInfo.pickInfo.pickedMesh.position)
            console.log("Piece let go closest to ", humanCoord)
            this.currentlySelectedPiece.removeParents();
            break
        }
      })// Lägg BABYLON.Whatever.PointerDOWN här för att begränsa callbacken till att bara köras då

      const featuresManager = xrHelper.baseExperience.featuresManager // or any other way to get a features manager
      featuresManager.enableFeature(BABYLON.WebXRFeatureName.TELEPORTATION, 'stable', {
        xrInput: xrHelper.input,
        floorMeshes: [this._ground]
      })
    }

    createGround (): void {
      this._ground = BABYLON.Mesh.CreateGround('ground', boardSize, boardSize, 1, this._scene, false)
      const groundMaterial = new BABYLON.StandardMaterial('ground', this._scene)
      groundMaterial.diffuseTexture = new BABYLON.Texture('https://upload.wikimedia.org/wikipedia/commons/d/d5/Chess_Board.svg', this._scene)
      groundMaterial.specularColor = BABYLON.Color3.Black()
      this._ground.material = groundMaterial
    }

    doRender (): void {
      this._engine.runRenderLoop(() => {
        this._scene.render()
      })

      window.addEventListener('resize', () => {
        this._engine.resize()
      })
    }
}
