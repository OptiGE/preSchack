import * as BABYLON from 'babylonjs'

import Piece from './piece'
import BoardStateHandler from './gamestate/boardStateHandler'
import { Coordinate } from './gamestate/gamestateTypes'

export default class Board {
    private scene: BABYLON.Scene;
    private pieces: Map<Coordinate, Piece>;
    private boardStateHandler: BoardStateHandler;

    constructor (scene: BABYLON.Scene) {
      this.scene = scene
      this.boardStateHandler = new BoardStateHandler()

      this.pieces = new Map<Coordinate, Piece>()
    }

    placePieces () {
      this.clearPieces()
      const board = this.boardStateHandler.getBoard()

      for (const [coordinate, pieceValue] of board) {
        console.log('piece', coordinate, pieceValue)
        this.pieces.set(coordinate, new Piece(coordinate, pieceValue, this.scene))
      }
    }

    clearPieces () {
      this.pieces.forEach(piece => {
        piece.deleteMesh()
      })

      this.pieces = new Map<Coordinate, Piece>()
    }

    updateBoard (update) {
      if (update.type === 'gameFull') {
        this.boardStateHandler.fullUpdate(update.state.moves)
        console.log(this.boardStateHandler.getBoard())
      } else if (update.type === 'gameState') {
        // In the future, this should only run stepUpdate for the latest move
        this.boardStateHandler.fullUpdate(update.moves)
        console.log(this.boardStateHandler.getBoard())
      } else {
        console.log('Confused by type')
      }
    }
}
