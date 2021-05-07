import ndjsonStream from "can-ndjson-stream";

export default class CanStream{

    private personalToken = 'wTjP95DubOM4kMPv';
    private gameId = "8MsjKhvA";

    goGet(){
        fetch("https://lichess.org/api/board/game/stream/" + this.gameId, { headers: {'Authorization': 'Bearer ' + this.personalToken}})
        .then( ( response ) => {
            return ndjsonStream( response.body ); //ndjsonStream parses the response.body

        } ).then( ( exampleStream ) => {
            const reader = exampleStream.getReader();
            let read;
            reader.read().then( read = ( result ) => {
                if ( result.done ) {
                    return;
                }

                console.log( result.value );
                reader.read().then( read );

            } );
        } );
    }
}