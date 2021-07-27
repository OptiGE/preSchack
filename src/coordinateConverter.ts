import { Coordinate } from './gamestate/gamestateTypes'
import { boardSize } from './const'
import AbsPosition from './absPosition'

const cornerxz = (boardSize / 2) - (boardSize / 16)
const tileSize = boardSize / 8

export function getAbsCoord (coordinate: Coordinate): AbsPosition {

  const abspos: AbsPosition = {
    x: cornerxz - tileSize * (getNumFromLetter(coordinate.charAt(0)) - 1),
    z: cornerxz - tileSize * (parseInt(coordinate.charAt(1)) - 1)
  }

  return abspos
}

export function getHumanCoord (abspos : AbsPosition) : Coordinate {

  const roundToNearestTile = (n : number) => tileSize*Math.round(n/tileSize) - (tileSize/2)

  const x1 = roundToNearestTile(abspos.x)
  const z2 = roundToNearestTile(abspos.z)

  let n1 = (cornerxz - x1) / tileSize // Avstånd från hörnet till faktisk position delat på rutbredd = antal rutor
  let n2 = ((cornerxz - z2) / tileSize) + 1 // +1 pga nollindexerat

  console.log("D E B U G", abspos, x1, z2, n1, n2, getLetterFromNum(n1))

  return `${getLetterFromNum(n1)}${n2}` as Coordinate
}

export function getNumFromLetter (l: string) : number {
  return l.toLowerCase().charCodeAt(0) - 97 + 1
}

export function getLetterFromNum (n : number): string {
  return String.fromCharCode(n + 97).toLowerCase()
}
