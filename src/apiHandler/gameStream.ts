import ndjsonStream from 'can-ndjson-stream';
import Board from '../board';
import AuthService from './authService';
import fetchWrapper from './fetchWrapper';

export default class GameStream {
    private auth: AuthService;

    constructor(auth : AuthService) {
        this.auth = auth;
    }

    public goUpdate(board: Board): void {
        fetchWrapper(this.auth, 'GET', '/board/game/stream/' + this.auth.gameId)
            .then((response) => {
                console.log('GameStream response', response);
                return ndjsonStream(response.body); // ndjsonStream parses the response.body
            })
            .then((stream) => {
                const reader = stream.getReader();
                let read;
                reader.read().then(read = (result) => {
                    if (result.done) {
                        return;
                    }
                    board.updateBoard(result.value);
                    board.placePieces();

                    reader.read().then(read);
                });
            });
    }
}
