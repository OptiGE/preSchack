import { AssetContainer } from 'babylonjs/assetContainer';
import { TileLetter, TileNumber, HumanPosition, TilePosition, AbsPosition } from './chess-types'
import Piece from './piece';

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
