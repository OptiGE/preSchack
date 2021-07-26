import Auth from './auth';

// For some reason ESlint can't resolve BodyInit and RequestInit
// I'm adding eslint-disable comments in this file

// eslint-disable-next-line no-undef
export default function fetchWrapper (method : string, endpoint : string, requestBody? : BodyInit) : Promise<Response> {
    const request = new Request(`https://lichess.org/api${endpoint}`);
    const headers = new Headers();

    const auth = new Auth();
    headers.append('Authorization', `Bearer ${auth.personalToken}`);

    // eslint-disable-next-line no-undef
    const requestInit : RequestInit = {
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: requestBody
    };

    return fetch(request, requestInit);
}
