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

        this.setUpTeam(this.p1_pieces, 0, 1);
        this.setUpTeam(this.p2_pieces, 7, -1);
    }

    setUpTeam(team: any, side : TileNumber, offset: number) : void {
        for (let i = 0 as TileNumber; i < 8; i++) {
            team.pawns[i] = new Piece({a: i, b: (side + offset) as TileNumber}, [0, 0, 1], this.scene)
        }

        team.nonpawns[0] = new Piece({a: 0, b: side}, [0, 1, 1], this.scene)
        team.nonpawns[1] = new Piece({a: 7, b: side}, [0, 1, 1], this.scene)

        team.nonpawns[2] = new Piece({a: 1, b: side}, [1, 0, 1], this.scene)
        team.nonpawns[3] = new Piece({a: 6, b: side}, [1, 0, 1], this.scene)

        team.nonpawns[4] = new Piece({a: 2, b: side}, [0, 1, 0], this.scene)
        team.nonpawns[5] = new Piece({a: 5, b: side}, [0, 1, 0], this.scene)

        team.nonpawns[6] = new Piece({a: 3, b: side}, [0, 0, 0], this.scene)
        team.nonpawns[7] = new Piece({a: 4, b: side}, [1, 1, 1], this.scene)
    }

}
