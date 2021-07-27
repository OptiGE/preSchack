import { Coordinate } from './gamestate/gamestateTypes';
import { boardSize } from './const';
import AbsPosition from './absPosition';

export function getAbsCoord (coordinate: Coordinate): AbsPosition {
    const cornerxz = (boardSize / 2) - (boardSize / 16);
    const tileSize = boardSize / 8;

    const abspos: AbsPosition = {
        x: cornerxz - tileSize * (getNumFromLetter(coordinate.charAt(0)) - 1),
        z: cornerxz - tileSize * (parseInt(coordinate.charAt(1)) - 1)
    };

    return abspos;
}

export function getHumanCoord (abspos : AbsPosition) : Coordinate {
    const cornerxz = (boardSize / 2) - (boardSize / 16);
    const tileSize = boardSize / 8;

    const numAboutToBeLetterletter = Math.round((cornerxz - abspos.x) / tileSize); // Avstånd från hörnet till faktisk position delat på rutbredd = antal rutor
    const letter = getLetterFromNum(numAboutToBeLetterletter);
    const number = ((cornerxz - abspos.z) / tileSize) + 1; // +1 för att det är nollindexerat tror

    return `${letter}${number}` as Coordinate;
}

export function getNumFromLetter (l: string) : number {
    return l.toLowerCase().charCodeAt(0) - 97 + 1;
}

export function getLetterFromNum (n : number): string {
    return String.fromCharCode(n + 97).toLowerCase();
}
