import * as BABYLON from 'babylonjs';

import { TileLetter, TileNumber, HumanPosition, AbsPosition, boardSize, getAbsCoord, BoardState, BoardRow } from './chess-types'
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

        this.p1_pieces = [];
        this.p2_pieces = [];
    }

    placePieces(){
        //MAN MÅSTE JU LOOPA ÖVER VALUES SPECIFIKT
        //ELLER KANSKE TOM KEYS OCH VALUES FÖR ATT HÅLLA KOLL PÅ VART
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        let board = this.boardStateHandler.getBoard()

        for (const [number, row] of Object.entries(board)) {
            for (const [letter, piece] of Object.entries(row)) {
                if (piece == "") continue;
                console.log(piece)
                this.p1_pieces.push(new Piece(piece.charAt(1), {l: letter as TileLetter, n: parseInt(number) as TileNumber}, piece.charAt(0), this.scene))
            }
        }
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
