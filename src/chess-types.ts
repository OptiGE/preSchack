export type TileLetter =  "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
export type TileNumber =   0  |  1  |  2  |  3  |  4  |  5  |  6  |  7 ;

export interface HumanPosition {
    l : TileLetter;
    n : TileNumber;
}

export interface TilePosition {
    a : TileNumber;
    b : TileNumber;
}

export interface AbsPosition {
    x : number;
    z : number;
}
