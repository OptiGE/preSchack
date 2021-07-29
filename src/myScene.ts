import * as BABYLON from 'babylonjs';
import Board from './board';
import { getHumanCoord } from './coordinateConverter';
import { boardSize } from './const';
import GameStream from './apiHandler/gameStream';
import Api from './apiHandler/api';
import Move from './gamestate/move';
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

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement
    this._engine = new BABYLON.Engine(this._canvas, true)

    // Listen for browser/canvas resize events
    window.addEventListener('resize', () => {
      this._engine.resize()
    })
  }

  async createScene(): Promise<void> {
    // Set up BABYLON
    this._scene = new BABYLON.Scene(this._engine) //this._scene.debugLayer.show();
    this._camera = new BABYLON.ArcRotateCamera('Camera', Math.PI, 1.1, 30, new BABYLON.Vector3(0, 0, 0), this._scene)
    this._camera.setTarget(BABYLON.Vector3.Zero())
    this._camera.attachControl(this._canvas, false)
    this._light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(0, 3, 0), this._scene);

    // Set up
    const board = new Board(this._scene)
    const api = new Api()
    this.createGround()

    // Start stream
    const stream = new GameStream()
    stream.goUpdate(board)

    // Set up VR
    const xrHelper = await this._scene.createDefaultXRExperienceAsync({
      floorMeshes: [this._ground]
    })

    //Pointerhantering (mus eller kontroll tex)
    this._scene.onPointerObservable.add((pointerInfo) => {

      // Om pointern träffade en mesh och man är inuti VR
      if (!(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh)) return;
      if (!(xrHelper.baseExperience.state === BABYLON.WebXRState.IN_XR)) return;

      const pointerInfoEvent = pointerInfo.event as PointerEvent // Det här är ett redigt fulhack för att TS är rädd att eventet också kan vara ett WheelEvent. Då kraschar detta.
      const xrInput = xrHelper.pointerSelection.getXRControllerByPointerId(pointerInfoEvent.pointerId)
      const motionController = xrInput.motionController
      let startCoord = null;
      let endCoord = null;

      if (motionController) {

        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            startCoord = getHumanCoord(pointerInfo.pickInfo.pickedMesh.position)
            console.log("Piece picked up closest to ", startCoord, pointerInfo.pickInfo.pickedMesh.position)
            this.currentlySelectedPiece = board.getPiece(startCoord)
            this.currentlySelectedPiece.mesh.setParent(motionController.rootMesh)
            break

          case BABYLON.PointerEventTypes.POINTERUP:
            if (!this.currentlySelectedPiece) return;
            this.currentlySelectedPiece.removeParents();
            endCoord = getHumanCoord(pointerInfo.pickInfo.pickedMesh.position)
            console.log("Piece let go closest to ", endCoord, pointerInfo.pickInfo.pickedMesh.position)

            console.log(`Attempting to make move: ${startCoord}${endCoord}`)
            api.makeMove(new Move(`${this.currentlySelectedPiece.getPosition()}${endCoord}`))

            //update stream

            break
        }

      } else {
        // Om clicken inte kom från en VR kontrollen (t.ex. musen)
      }
    })

    // Set up feature manager
    const featuresManager = xrHelper.baseExperience.featuresManager // or any other way to get a features manager
    featuresManager.enableFeature(BABYLON.WebXRFeatureName.TELEPORTATION, 'stable', {
      xrInput: xrHelper.input,
      floorMeshes: [this._ground]
    })
  }

  createGround(): void {
    this._ground = BABYLON.Mesh.CreateGround('ground', boardSize, boardSize, 1, this._scene, false)
    const groundMaterial = new BABYLON.StandardMaterial('ground', this._scene)
    groundMaterial.diffuseTexture = new BABYLON.Texture('https://upload.wikimedia.org/wikipedia/commons/d/d5/Chess_Board.svg', this._scene)
    groundMaterial.specularColor = BABYLON.Color3.Black()
    this._ground.material = groundMaterial
  }

  doRender(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render()
    })

    window.addEventListener('resize', () => {
      this._engine.resize()
    })
  }
}