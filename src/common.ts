import { TileLetter, TileNumber, HumanPosition, TilePosition, AbsPosition } from './chess-types'

export const boardSize = 400;

export function getAbsCoord(tilepos : TilePosition) : AbsPosition {
    let cornerxz = (boardSize / 2) - (boardSize / 16)
    let tileSize = boardSize / 8
    
    let abspos : AbsPosition = {
        x: cornerxz - tileSize * tilepos.a,
        z: cornerxz - tileSize * tilepos.b
    }

    return abspos
}

export function getNumFromLetter(l : TileLetter){
    return l.toLowerCase().charCodeAt(0) - 97 + 1
}

export const lineup = ["tower", "horse", "bishop", "queen", "king", "bishop", "horse", "tower"]
export const numlineup = [1, 2, 3, 4, 5, 3, 2, 1]
export enum PrintMedia {
    Pawn = 1,
    Tower,
    Horse,
    Bishop,
    Queen,
    King
  }


export const pieceTypes = {
    "pawn": {
        "mesh": "green"
    }
}