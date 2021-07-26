import ndjsonStream from 'can-ndjson-stream'
import Board from './board'

export default class CanStream {
    private personalToken = 'wTjP95DubOM4kMPv';
    private gameId = 'H9D6cP4s';

    goUpdate (board: Board) {
      fetch('https://lichess.org/api/board/game/stream/' + this.gameId, { headers: { Authorization: 'Bearer ' + this.personalToken } })
        .then((response) =>
          ndjsonStream(response.body) // ndjsonStream parses the response.body
        )
        .then((stream) => {
          const reader = stream.getReader()
          let read
          reader.read().then(read = (result) => {
            if (result.done) {
              return
            }
            console.log(result.value)
            board.updateBoard(result.value)
            board.placePieces()

            reader.read().then(read)
          })
        })
    }
}