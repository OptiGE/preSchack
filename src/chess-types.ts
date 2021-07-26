export type TileLetter =  "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type TileNumber =   1  |  2  |  3  |  4  |  5  |  6  |  7  |  8 ;

export const boardSize = 10;

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
    //Cornerxz är mitt på hörnrutan
    let cornerxz = (boardSize / 2) - (boardSize / 16)
    let tileSize = boardSize / 8
    
    let abspos : AbsPosition = {
        x: cornerxz - tileSize * (getNumFromLetter(humanpos.l) - 1),
        z: cornerxz - tileSize * (humanpos.n - 1)
    }

    return abspos
}

export function getHumanCoord(abspos : AbsPosition) : HumanPosition {

    let cornerxz = (boardSize / 2) - (boardSize / 16)
    let tileSize = boardSize / 8
    
    let numAboutToBeLetterletter = Math.round((cornerxz - abspos.x) / tileSize) as TileNumber //Avstånd från hörnet till faktisk position delat på rutbredd = antal rutor
    let letter = getLetterFromNum(numAboutToBeLetterletter) as TileLetter
    let number = ((cornerxz - abspos.z) / tileSize) + 1 as TileNumber // +1 för att det är nollindexerat tror jag

    let humpos : HumanPosition = {
        l: letter,
        n: number
    }

    return humpos
}

export function getNumFromLetter(l : TileLetter): TileNumber{
    return l.toLowerCase().charCodeAt(0) - 97 + 1 as TileNumber
}

export function getLetterFromNum(n : TileNumber): TileLetter{
    return String.fromCharCode(n + 97).toLowerCase() as TileLetter
}
