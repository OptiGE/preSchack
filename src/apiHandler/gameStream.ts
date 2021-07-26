import ndjsonStream from 'can-ndjson-stream';
import Board from '../board';
import Auth from './auth';
import fetchWrapper from './fetchWrapper';

export default class GameStream {
  private auth : Auth;

  constructor () {
      this.auth = new Auth();
  }

  public goUpdate (board: Board) : void {
      fetchWrapper('GET', '/board/game/stream/' + this.auth.gameId)
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
