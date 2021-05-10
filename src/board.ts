import * as BABYLON from 'babylonjs';

import { TileLetter, TileNumber, HumanPosition, TilePosition, AbsPosition } from './chess-types'
import { boardSize, getAbsCoord } from './common'
import Piece from './piece'
import BoardStateHandler from './utilities/boardStateHandler';

export default class Board {
    private scene: BABYLON.Scene;
    private p1_pieces: any;
    private p2_pieces: any;
    private boardStateHandler: BoardStateHandler;

    constructor(scene : BABYLON.Scene) {
        this.scene = scene;
        this.boardStateHandler = new BoardStateHandler();

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

    updateBoard(update){
        if(update.type == "gameFull"){
            this.boardStateHandler.fullUpdate(update.state.moves)
            console.log(this.boardStateHandler.getBoard())
        }else if (update.type == "gameState"){
            // In the future, this should only run stepUpdate for the latest move
            this.boardStateHandler.fullUpdate(update.moves)
            console.log(this.boardStateHandler.getBoard())
        }else{
            console.log("Confused by type")
        }
    }

}
