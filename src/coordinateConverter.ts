import { Coordinate } from './gamestate/gamestateTypes'
import { boardSize } from './const'
import AbsPosition from './absPosition'

const cornerxz = (boardSize / 2) - (boardSize / 16)
const tileSize = boardSize / 8

export function getAbsCoord(coordinate: Coordinate): AbsPosition {

  const abspos: AbsPosition = {
    x: cornerxz - tileSize * (getNumFromLetter(coordinate.charAt(0)) - 1),
    z: cornerxz - tileSize * (parseInt(coordinate.charAt(1)) - 1)
  }

  return abspos
}

export function getHumanCoord(abspos: AbsPosition): Coordinate {

  let n1 = (cornerxz - abspos.x) / tileSize // Avstånd från hörnet till faktisk position delat på rutbredd = antal rutor
  let n2 = ((cornerxz - abspos.z) / tileSize) + 1 // +1 pga nollindexerat

  return `${getLetterFromNum(n1)}${n2}` as Coordinate
}

export function getNumFromLetter(l: string): number {
  return l.toLowerCase().charCodeAt(0) - 97 + 1
}

export function getLetterFromNum(n: number): string {
  return String.fromCharCode(n + 97).toLowerCase()
}
