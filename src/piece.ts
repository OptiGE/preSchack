import * as BABYLON from 'babylonjs';

import { TileLetter, TileNumber, HumanPosition, TilePosition, AbsPosition } from './chess-types'
import { boardSize, getAbsCoord } from './common'

export default class Piece {
    private scene: BABYLON.Scene;
    private position: TilePosition;
    private mesh: BABYLON.Mesh;


    constructor(pieceType: string, position : TilePosition, color : [number, number, number], scene : BABYLON.Scene) {
        this.scene = scene;
        this.position = position;

        this.createPiece(pieceType, color);
        this.movePiece(position);
    }

    movePiece(newpos : TilePosition) : void {
        let absPos = getAbsCoord(newpos)
        
        this.mesh.position.x = absPos.x;
        this.mesh.position.z = absPos.z;
    }

    createPiece(pieceType : string, [r, g, b]: [number, number, number]) : void{
        let height = boardSize/20;

        switch(pieceType) {
            case "pawn":
                height = boardSize/20;
                this.mesh = BABYLON.MeshBuilder.CreateBox("white", {"height": height, "width": boardSize/20, "depth": boardSize/20}, this.scene);
            break;
            case "rook":
                height = boardSize/10;
                this.mesh = BABYLON.MeshBuilder.CreateBox("white", {"height": height, "width": boardSize/14, "depth": boardSize/14}, this.scene);
            break;
            case "bishop":
                height = 45;
                this.mesh = BABYLON.MeshBuilder.CreatePolyhedron("white", {"type": 1, "size": boardSize/25}, this.scene);
            break;
            case "horse":
                height = 10;
                this.mesh = BABYLON.MeshBuilder.CreateTorus("white", {"diameter": 25, "thickness": 10} , this.scene);
            break;
            case "king":
                height = boardSize/6;
                this.mesh = BABYLON.MeshBuilder.CreateCylinder("white", {"height": height, "diameterBottom": 30, "diameterTop": 30}, this.scene);
            break;
            case "queen":
                height = boardSize/5;
                this.mesh = BABYLON.MeshBuilder.CreateCylinder("white", {"height": height, "diameterBottom": 30, "diameterTop": 4}, this.scene);
            break;
            default:
                height = boardSize/20;
                this.mesh = BABYLON.MeshBuilder.CreateBox("white", {"height": height, "width": boardSize/20, "depth": boardSize/20}, this.scene);
            break;
        }

            var blueMat = new BABYLON.StandardMaterial("ground", this.scene);
            blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            blueMat.emissiveColor = new BABYLON.Color3(r, g, b);
            this.mesh.material = blueMat;
            this.mesh.position.y = height/2;
    }

}