/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-this-alias */
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

    public getPosition(): Coordinate {
        return this.position;
    }

    public deleteMesh(): void {
        this.mesh.dispose();
    }

    private createPiece(): void {
        const self = this;

        const assetsManager = new BABYLON.AssetsManager(this.scene);
        assetsManager.load();
        console.log(`Current: ${this.pieceValue.charAt(1)}`);
        switch (this.pieceValue.charAt(1)) {
            case 'p':
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_pawn/', 'pawn.obj', this.scene, function (meshes) {
                    self.mesh = meshes[0] as Mesh;
                    self.addMaterial();
                    self.movePiece();
                });
                break;
            case 'r':
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_rook/', 'rook.obj', this.scene, function (meshes) {
                    self.mesh = meshes[0] as Mesh;
                    self.addMaterial();
                    self.movePiece();
                });
                break;
            case 'b':
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_bishop/', 'bishop.obj', this.scene, function (meshes) {
                    self.mesh = meshes[0] as Mesh;
                    self.addMaterial();
                    self.movePiece();
                });
                break;
            case 'k':
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_knight/', 'knight.obj', this.scene, function (meshes) {
                    self.mesh = meshes[0] as Mesh;
                    self.addMaterial();
                    self.movePiece();
                });
                break;
            case 'K':
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_king/', 'king.obj', this.scene, function (meshes) {
                    self.mesh = meshes[0] as Mesh;
                    self.addMaterial();
                    self.movePiece();
                });
                break;
            case 'q':
                BABYLON.SceneLoader.ImportMesh('', './src/models/low_poly_queen/', 'queen.obj', this.scene, function (meshes) {
                    self.mesh = meshes[0] as Mesh;
                    self.addMaterial();
                    self.movePiece();
                });
                break;
            default:
                console.error('Undefined piece type');
                break;
        }
    }

    private movePiece(): void {
        const absPos = getAbsCoord(this.position);

        this.mesh.position.x = absPos.x;
        this.mesh.position.z = absPos.z;
        this.mesh.position.y = 0;
    }

    private addMaterial(): void {
        let scaleFactor = 0.02 * boardSize;
        this.mesh.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor);
        this.material = new BABYLON.StandardMaterial('paint', this.scene);
        this.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        this.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        if (this.pieceValue.charAt(0) === 'w') this.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        else if (this.pieceValue.charAt(0) === 'b') this.material.emissiveColor = new BABYLON.Color3(0.02, 0.02, 0.02);
        this.mesh.material = this.material;
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
