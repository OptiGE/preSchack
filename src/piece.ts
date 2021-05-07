import * as BABYLON from 'babylonjs';

import { TileLetter, TileNumber, HumanPosition, TilePosition, AbsPosition } from './chess-types'
import { boardSize, getAbsCoord } from './common'

export default class Piece {
    private scene: BABYLON.Scene;
    private position: TilePosition;
    private mesh: BABYLON.Mesh;


    constructor(position : TilePosition, color : [number, number, number], scene : BABYLON.Scene) {
        this.scene = scene;
        this.position = position;

        this.createPiece(color);
        this.movePiece(position);
    }

    movePiece(newpos : TilePosition) : void {
        let absPos = getAbsCoord(newpos)
        
        this.mesh.position.x = absPos.x;
        this.mesh.position.z = absPos.z;
    }

    createPiece([r, g, b]: [number, number, number]) : void{
            this.mesh = BABYLON.Mesh.CreateBox("white", boardSize/12, this.scene);
            var blueMat = new BABYLON.StandardMaterial("ground", this.scene);
            blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            blueMat.emissiveColor = new BABYLON.Color3(r, g, b);
            this.mesh.material = blueMat;
            this.mesh.position.y = boardSize/12/2;
    }

}