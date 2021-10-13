import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

import { Coordinate, PieceValue } from './gamestate/gamestateTypes';
import { getAbsCoord } from './coordinateConverter';
import { boardSize } from './const';
import { Mesh } from 'babylonjs/Meshes/mesh';

export default class Piece {
    private scene: BABYLON.Scene;
    private position: Coordinate;
    private pieceValue: PieceValue;
    public mesh: BABYLON.Mesh;
    private selected: boolean;
    private material: BABYLON.StandardMaterial;

    constructor(position: Coordinate, pieceValue: PieceValue, scene: BABYLON.Scene) {
        this.scene = scene;
        this.position = position;
        this.pieceValue = pieceValue;
        this.createPiece();
    }

    public getPosition() {
        return this.position;
    }

    public deleteMesh(): void {
        this.mesh.dispose();
    }

    private movePiece(): void {
        const absPos = getAbsCoord(this.position);

        this.mesh.position.x = absPos.x;
        this.mesh.position.z = absPos.z;
    }

    private createPiece(): void {
        const self = this;
        let height = boardSize / 20;

        const assetsManager = new BABYLON.AssetsManager(this.scene);
        assetsManager.load();

        switch (this.pieceValue.charAt(1)) {
            case 'p':
                //this.mesh = BABYLON.MeshBuilder.CreateBox('gray', { height: height, width: boardSize / 20, depth: boardSize / 20 }, this.scene);
                // The first parameter can be used to specify which mesh to import. Here we import all meshes
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_pawn/', 'scene.glb', this.scene, function (meshes) {
                    console.log(meshes);
                    self.mesh = meshes[0];
                    self.mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                    self.addMaterial(height);
                    self.movePiece();
                });

            /*
        let meshTask = assetsManager.addMeshTask("pawn", "", "./src/models/low_poly_pawn/", "scene.glb");
        meshTask.onSuccess = function (task) {
            task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
            task.loadedMeshes[0].scaling.copyFromFloats(0.03, 0.03, 0.03);
            let fishMesh = task.loadedMeshes[0];
            fishMesh.rotationQuaternion = new BABYLON.Quaternion();
            fishMesh.position.y -= 1.2;
        }
        messTask.onError = (task) => { console.log("HLEP"); }
        break;
        */
            /*
                case 'r':
                    height = boardSize / 10;
                    this.mesh = BABYLON.MeshBuilder.CreateBox('gray', { height: height, width: boardSize / 14, depth: boardSize / 14 }, this.scene);
                    break;
                case 'b':
                    height = boardSize / 10;
                    this.mesh = BABYLON.MeshBuilder.CreatePolyhedron('gray', { type: 1, size: boardSize / 25 }, this.scene);
                    break;
                case 'k':
                    height = boardSize / 30;
                    this.mesh = BABYLON.MeshBuilder.CreateTorus('gray', { diameter: boardSize / 15, thickness: boardSize / 30 }, this.scene);
                    break;
                case 'K':
                    height = boardSize / 6;
                    this.mesh = BABYLON.MeshBuilder.CreateBox('gray', { height: height, width: boardSize / 20, depth: boardSize / 20 }, this.scene);
                    break;
                case 'q':
                    height = boardSize / 5;
                    this.mesh = BABYLON.MeshBuilder.CreateCylinder('gray', { height: height, diameterBottom: boardSize / 10, diameterTop: boardSize / 35 }, this.scene);
                    break;
            */
            default:
                console.error('Undefined piece type');
                break;
        }
    }

    private addMaterial(height: number): void {
        console.log("this");
        console.log(this);
        this.material = new BABYLON.StandardMaterial('ground', this.scene);
        this.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        this.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        if (this.pieceValue.charAt(0) === 'w') this.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        else if (this.pieceValue.charAt(0) === 'b') this.material.emissiveColor = new BABYLON.Color3(0.02, 0.02, 0.02);
        this.mesh.material = this.material;
        this.mesh.position.y = height / 2;
    }

    public toggleSelect(): void {
        const selectedMaterial = new BABYLON.StandardMaterial('ground', this.scene);
        selectedMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        selectedMaterial.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        selectedMaterial.emissiveColor = new BABYLON.Color3(1, 0.3, 0.3);

        if (this.selected) {
            this.mesh.material = this.material;
            this.selected = false;
        } else {
            this.mesh.material = selectedMaterial;
            this.selected = true;
        }
    }

    removeParents() {
        this.mesh.setParent(null);
    }
}
