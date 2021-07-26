import * as BABYLON from 'babylonjs'
import Board from './board'
import { boardSize } from './chess-types'
import CanStream from './can-stream'

export default class MyScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _ground: BABYLON.Mesh;
    private xrCamera: BABYLON.WebXRCamera;

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
      this._light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, 1, 0), this._scene)
      const board = new Board(this._scene)
      this.createGround()

      // Start stream
      const canStream = new CanStream()
      canStream.goUpdate(board)

      // Set up VR
      const xr = await this._scene.createDefaultXRExperienceAsync({
        floorMeshes: [this._ground]
      })
      const xrHelper = await BABYLON.WebXRExperienceHelper.CreateAsync(this._scene)
      // const sessionManager = await xrHelper.enterXRAsync("immersive-vr", "local-floor" /*, optional render target*/);
      const xrSessionManager = new BABYLON.WebXRSessionManager(this._scene)

      xrHelper.camera = new BABYLON.WebXRCamera('VRcamera', this._scene, xrSessionManager)
      xrHelper.camera.setTransformationFromNonVRCamera(this._camera, true)
      xrHelper.camera.position.y = 400 // Does nothing

      xrHelper.onInitialXRPoseSetObservable.add((xrCamera) => {
        // floor is at y === 2
        xrCamera.position.y = 40
        xrCamera.position.x = 400
      })

      const featuresManager = xr.baseExperience.featuresManager // or any other way to get a features manager
      featuresManager.enableFeature(BABYLON.WebXRFeatureName.TELEPORTATION, 'stable' /* or latest */, {
        xrInput: xr.input,
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
