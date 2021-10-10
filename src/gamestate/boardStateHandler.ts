import Move from './move';
import { Coordinate, PieceValue } from './gamestateTypes';

export default class BoardStateHandler {
  private board: Map<Coordinate, PieceValue>
    = new Map<Coordinate, PieceValue>();

  public fullUpdate(movesString: string): void {
    this.resetState();

    const moves = movesString
      .split(' ')
      .map(moveString => new Move(moveString));

    moves.forEach((move: Move) => {
      console.log(this.board);
      this.executeMove(move);
    });
  }

  public getBoard(): [Coordinate, PieceValue][] {
    const result: [Coordinate, PieceValue][] = [];

    this.board.forEach((pieceValue, coordinate) => {
      if (pieceValue != null) {
        result.push([coordinate, pieceValue]);
      }
    });

    return result;
  }

  private executeMove(move: Move): void {
    // TODO: En passant
    if (this.isPromotion(move)) {
      this.movePiece(move, this.promotedPieceValue(move));
    } else if (this.isCastle(move)) {
      this.movePiece(move);
      this.movePiece(this.castleRookMove(move));
    } else if (this.isEnPassant(move)) {
      this.movePiece(move);
      this.removeEnPassant(move);
    } else {
      this.movePiece(move);
    }
  }

  private isPromotion(move: Move): boolean {
    return move.PromotedTo != null;
  }

  private isEnPassant(move: Move): boolean {
    const pieceValue = this.board.get(move.From);

    // A pawn && takes && an empty square
    return (["wp", "bp"].includes(pieceValue) && move.From.split("")[0] != move.To.split("")[0] && this.board.get(move.To) == null)
  }

  private isCastle(move: Move): boolean {
    const pieceValue = this.board.get(move.From);

    return (pieceValue === 'wK' && move.From === 'e1' && move.To === 'c1') ||
      (pieceValue === 'wK' && move.From === 'e1' && move.To === 'g1') ||
      (pieceValue === 'bK' && move.From === 'e8' && move.To === 'c8') ||
      (pieceValue === 'bK' && move.From === 'e8' && move.To === 'g8');
  }

  private castleRookMove(move: Move): Move {
    const pieceValue = this.board.get(move.From);

    if (pieceValue === 'wK' && move.From === 'e1' && move.To === 'c1') {
      return new Move('a1d1');
    } else if (pieceValue === 'wK' && move.From === 'e1' && move.To === 'g1') {
      return new Move('h1f1');
    } else if (pieceValue === 'bK' && move.From === 'e8' && move.To === 'c8') {
      return new Move('a8d8');
    } else if (pieceValue === 'bK' && move.From === 'e8' && move.To === 'g8') {
      return new Move('h8f8');
    }

    return null;
  }

  private removeEnPassant(move: Move): void {
    const deathsquare = `${move.getCol(move.To)}${move.getRow(move.From)}` as Coordinate
    this.board.set(deathsquare, null);
  }

  private promotedPieceValue(move: Move): PieceValue {
    const oldPiece = move.From;
    const newPiece = `${oldPiece.charAt(0)}${move.PromotedTo}` as PieceValue;

    return newPiece;
  }

  private movePiece(move: Move, piece?: PieceValue): void {
    const thePiece = piece ?? this.board.get(move.From);

    this.board.set(move.To, thePiece);
    this.board.set(move.From, null);
  }

  private resetState(): void {
    this.board.set('a1', 'wr');
    this.board.set('b1', 'wk');
    this.board.set('c1', 'wb');
    this.board.set('d1', 'wq');
    this.board.set('e1', 'wK');
    this.board.set('f1', 'wb');
    this.board.set('g1', 'wk');
    this.board.set('h1', 'wr');
    this.board.set('a2', 'wp');
    this.board.set('b2', 'wp');
    this.board.set('c2', 'wp');
    this.board.set('d2', 'wp');
    this.board.set('e2', 'wp');
    this.board.set('f2', 'wp');
    this.board.set('g2', 'wp');
    this.board.set('h2', 'wp');
    this.board.set('a3', null);
    this.board.set('b3', null);
    this.board.set('c3', null);
    this.board.set('d3', null);
    this.board.set('e3', null);
    this.board.set('f3', null);
    this.board.set('g3', null);
    this.board.set('h3', null);
    this.board.set('a4', null);
    this.board.set('b4', null);
    this.board.set('c4', null);
    this.board.set('d4', null);
    this.board.set('e4', null);
    this.board.set('f4', null);
    this.board.set('g4', null);
    this.board.set('h4', null);
    this.board.set('a5', null);
    this.board.set('b5', null);
    this.board.set('c5', null);
    this.board.set('d5', null);
    this.board.set('e5', null);
    this.board.set('f5', null);
    this.board.set('g5', null);
    this.board.set('h5', null);
    this.board.set('a6', null);
    this.board.set('b6', null);
    this.board.set('c6', null);
    this.board.set('d6', null);
    this.board.set('e6', null);
    this.board.set('f6', null);
    this.board.set('g6', null);
    this.board.set('h6', null);
    this.board.set('a7', 'bp');
    this.board.set('b7', 'bp');
    this.board.set('c7', 'bp');
    this.board.set('d7', 'bp');
    this.board.set('e7', 'bp');
    this.board.set('f7', 'bp');
    this.board.set('g7', 'bp');
    this.board.set('h7', 'bp');
    this.board.set('a8', 'br');
    this.board.set('b8', 'bk');
    this.board.set('c8', 'bb');
    this.board.set('d8', 'bq');
    this.board.set('e8', 'bK');
    this.board.set('f8', 'bb');
    this.board.set('g8', 'bk');
    this.board.set('h8', 'br');
  }
}
