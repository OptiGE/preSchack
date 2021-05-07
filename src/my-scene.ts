import * as BABYLON from 'babylonjs';
import Board from './board'
import { boardSize, getAbsCoord } from './common'
import CanStream from './can-stream';

export default class MyScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement : string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);

        // Listen for browser/canvas resize events
        window.addEventListener("resize", ()=> {
            this._engine.resize();
        });
    }

    createScene() : void {
        this._scene = new BABYLON.Scene(this._engine);
    
        this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.1, 480, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);

        this._light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0,1,0), this._scene);
    
        let board = new Board(this._scene)

        this.createGround();

        //let browserStream = new BrowserStream();
        //browserStream.process();

        let canStream = new CanStream();
        canStream.goGet();
    }

    createGround() : void {
        var ground = BABYLON.Mesh.CreateGround("ground", boardSize, boardSize, 1, this._scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", this._scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/d/d5/Chess_Board.svg", this._scene);
        groundMaterial.specularColor = BABYLON.Color3.Black();
        ground.material = groundMaterial;
    }

    doRender() : void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}