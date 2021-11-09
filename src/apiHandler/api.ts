import AuthService from './authService';
import Move from '../gamestate/move';
import fetchWrapper from './fetchWrapper';

export default class Api {
    private auth : AuthService;

    constructor (auth : AuthService) {
        this.auth = auth;
    }

    public makeMove (move : Move) : Promise<boolean> {
        return fetchWrapper(this.auth, 'POST', `/board/game/${this.auth.gameId}/move/${move.getMoveString()}`)
            .then(response => {
                if (response.status === 200 && response.ok) {
                    return true;
                }
                console.error('Error when executing http request', response);
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    }
}
