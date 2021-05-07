import * as BABYLON from 'babylonjs';

import { TileLetter, TileNumber, HumanPosition, TilePosition, AbsPosition } from './chess-types'
import { boardSize, getAbsCoord } from './common'
import Piece from './piece'

export default class Board {
    private scene: BABYLON.Scene;
    private p1_pieces: any;
    private p2_pieces: any;

    constructor(scene : BABYLON.Scene) {
        this.scene = scene;

        this.p1_pieces = {
            pawns: {},
            nonpawns: {}
        }

        this.p2_pieces = {
            pawns: {},
            nonpawns: {}
        }

        this.setUpTeam(this.p1_pieces, [0.02, 0.02, 0.02], 0, 1);
        this.setUpTeam(this.p2_pieces, [0.5, 0.5, 0.5], 7, -1);
    }

    setUpTeam(team: any, color : [number, number, number], side : TileNumber, offset: number) : void {
        for (let i = 0 as TileNumber; i < 8; i++) {
            team.pawns[i] = new Piece("pawn", {a: i, b: (side + offset) as TileNumber}, color, this.scene)
        }

        team.nonpawns[0] = new Piece("rook", {a: 0, b: side}, color, this.scene)
        team.nonpawns[1] = new Piece("rook", {a: 7, b: side}, color, this.scene)

        team.nonpawns[2] = new Piece("horse", {a: 1, b: side}, color, this.scene)
        team.nonpawns[3] = new Piece("horse", {a: 6, b: side}, color, this.scene)

        team.nonpawns[4] = new Piece("bishop", {a: 2, b: side}, color, this.scene)
        team.nonpawns[5] = new Piece("bishop", {a: 5, b: side}, color, this.scene)

        team.nonpawns[6] = new Piece("king", {a: 3, b: side}, color, this.scene)
        team.nonpawns[7] = new Piece("queen", {a: 4, b: side}, color, this.scene)
    }

}
