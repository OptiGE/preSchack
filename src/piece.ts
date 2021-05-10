import * as BABYLON from 'babylonjs';

import { TileLetter, TileNumber, HumanPosition, AbsPosition, boardSize, getAbsCoord } from './chess-types'

export default class Piece {
    private scene: BABYLON.Scene;
    private position: HumanPosition;
    private mesh: BABYLON.Mesh;


    constructor(pieceType: string, position : HumanPosition, color : string, scene : BABYLON.Scene) {
        this.scene = scene;
        this.position = position;

        this.createPiece(pieceType, color);
        this.movePiece(position);
    }

    movePiece(newpos : HumanPosition) : void {
        let absPos = getAbsCoord(newpos)
        
        this.mesh.position.x = absPos.x;
        this.mesh.position.z = absPos.z;
    }

    createPiece(pieceType : string, color : string) : void{
        let height = boardSize/20;

        switch(pieceType) {
            case "p":
                height = boardSize/20;
                this.mesh = BABYLON.MeshBuilder.CreateBox("gray", {"height": height, "width": boardSize/20, "depth": boardSize/20}, this.scene);
            break;
            case "r":
                height = boardSize/10;
                this.mesh = BABYLON.MeshBuilder.CreateBox("gray", {"height": height, "width": boardSize/14, "depth": boardSize/14}, this.scene);
            break;
            case "b":
                height = 45;
                this.mesh = BABYLON.MeshBuilder.CreatePolyhedron("gray", {"type": 1, "size": boardSize/25}, this.scene);
            break;
            case "k":
                height = 10;
                this.mesh = BABYLON.MeshBuilder.CreateTorus("gray", {"diameter": 25, "thickness": 10} , this.scene);
            break;
            case "K":
                height = boardSize/6;
                this.mesh = BABYLON.MeshBuilder.CreateCylinder("gray", {"height": height, "diameterBottom": 30, "diameterTop": 30}, this.scene);
            break;
            case "q":
                height = boardSize/5;
                this.mesh = BABYLON.MeshBuilder.CreateCylinder("gray", {"height": height, "diameterBottom": 30, "diameterTop": 4}, this.scene);
            break;
            default:
                height = boardSize/20;
                this.mesh = BABYLON.MeshBuilder.CreateBox("gray", {"height": height, "width": boardSize/20, "depth": boardSize/20}, this.scene);
            break;
        }

            var blueMat = new BABYLON.StandardMaterial("ground", this.scene);
            blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            if(color == "w")       blueMat.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            else if (color == "b") blueMat.emissiveColor = new BABYLON.Color3(0.02, 0.02, 0.02);
            this.mesh.material = blueMat;
            this.mesh.position.y = height/2;
    }

}