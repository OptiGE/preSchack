export type TileLetter =  "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type TileNumber =   1  |  2  |  3  |  4  |  5  |  6  |  7  |  8 ;

export const boardSize = 40;

export interface HumanPosition {
    l : TileLetter;
    n : TileNumber;
}

export interface AbsPosition {
    x : number;
    z : number;
}

//Båda nedanstående är type istället för interface pga: https://github.com/microsoft/TypeScript/issues/24220
export type BoardState = {
    [rowNumber in TileNumber] : BoardRow
}

export type BoardRow = {
    [colLetter in TileLetter] : string
}

export function getAbsCoord(humanpos : HumanPosition) : AbsPosition {
    let cornerxz = (boardSize / 2) - (boardSize / 16)
    let tileSize = boardSize / 8
    
    let abspos : AbsPosition = {
        x: cornerxz - tileSize * (getNumFromLetter(humanpos.l) - 1),
        z: cornerxz - tileSize * (humanpos.n - 1)
    }

    return abspos
}

export function getNumFromLetter(l : TileLetter){
    return l.toLowerCase().charCodeAt(0) - 97 + 1
}