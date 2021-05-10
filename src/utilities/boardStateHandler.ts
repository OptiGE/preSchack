export default class BoardStateHandler{
    private board = {
        "8": {"a": "br", "b": "bk", "c": "bb", "d": "bq", "e": "bK", "f": "bb", "g": "bk", "h": "br"},
        "7": {"a": "bp", "b": "bp", "c": "bp", "d": "bp", "e": "bp", "f": "bp", "g": "bp", "h": "bp"},
        "6": {"a": "",   "b": "",   "c": "",   "d": "",   "e": "",   "f": "",   "g": "",   "h": ""},
        "5": {"a": "",   "b": "",   "c": "",   "d": "",   "e": "",   "f": "",   "g": "",   "h": ""},
        "4": {"a": "",   "b": "",   "c": "",   "d": "",   "e": "",   "f": "",   "g": "",   "h": ""},
        "3": {"a": "",   "b": "",   "c": "",   "d": "",   "e": "",   "f": "",   "g": "",   "h": ""},
        "2": {"a": "wp", "b": "wp", "c": "wp", "d": "wp", "e": "wp", "f": "wp", "g": "wp", "h": "wp"},
        "1": {"a": "wr", "b": "wk", "c": "wb", "d": "wq", "e": "wK", "f": "wb", "g": "wk", "h": "wr"},
    };
    private castlingMoves = ["e8c8", "e8g8", "e1c1", "e1g1"];

    constructor(){
    }

    private movePiece(move : string) : void {
        let [fl, fn, tl, tn, pp] = move.split("");
        this.board[tn][tl] = this.board[fn][fl];
        this.board[fn][fl] = "";
    }
    
    private movesPiece(move : string, pieceChar : string) : boolean {
        let [fl, fn, tl, tn, pp] = move.split("");
        return this.board[fn][fl].charAt(1) == pieceChar;
    }
    
    private promotePiece(move : string) : void {
        let [fl, fn, tl, tn, pp] = move.split("");
        let playerColor = this.board[tn][tl].charAt(0);
        this.board[tn][tl] = playerColor + pp;
    }
        
    fullUpdate(moveString){
        let moves = moveString.split(" ");
        moves.forEach(move => {
            this.stepUpdate(move);
        });
    }

    getBoard(){
        return this.board;
    }

    stepUpdate(move : string){
        let [fl, fn, tl, tn, pp] = move.split("");         //From, to, letter, number, promotepiece

            if(move.length == 5){
                this.movePiece(move);
                this.promotePiece(move);

            }else if (this.castlingMoves.includes(move) && this.movesPiece(move, "K")){
                this.movePiece(move);
                if(tl == "c") this.movePiece(`a${fn}d${fn}`);
                if(tl == "g") this.movePiece(`h${fn}f${fn}`);

            }else if (move.length == 4) this.movePiece(move);

            else console.log("Illegal move: " + move);
    }
    
}