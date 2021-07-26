import { Coordinate, PromotionPiece } from './gamestateTypes'

export class Move {
    public From : Coordinate;
    public To : Coordinate;
    public PromotedTo: PromotionPiece;

    constructor (move : string) {
      this.From = move.slice(0, 2) as Coordinate
      this.To = move.slice(2, 4) as Coordinate
      if (move.length === 5) {
        this.PromotedTo = move.charAt(4) as PromotionPiece
      } else {
        this.PromotedTo = null
      }
    }
}
