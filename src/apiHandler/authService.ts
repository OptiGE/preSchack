import { AccessContext, OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce';
export default class AuthService {
    private lichessHost = 'https://lichess.org';
    private clientId = 'localhost';
    private clientUrl = (() => {
        const url = new URL(location.href);
        url.search = '';
        console.log('url', url.href, url);
        return `${url.href}authed`;
    })();
    
    public gameId = '8kx78OI0';

    private oauth = new OAuth2AuthCodePKCE({
        authorizationUrl: `${this.lichessHost}/oauth`,
        tokenUrl: `${this.lichessHost}/api/token`,
        clientId: this.clientId,
        scopes: ['board:play'],
        redirectUrl: this.clientUrl,
        onAccessTokenExpiry: refreshAccessToken => refreshAccessToken(),
        onInvalidGrant: _retry => { console.log('invalid grant'); }
    });

    error?: any;
    accessContext?: AccessContext;
    
    getAccessToken(): Promise<AccessContext> {
        return this.oauth.getAccessToken();
    }

    async login (): Promise<void> {
        // Redirect to authentication prompt.
        await this.oauth.fetchAuthorizationCode();
    }

    async logout (): Promise<void> {
        const token = this.accessContext?.token?.value;
        this.accessContext = undefined;
        this.error = undefined;

        // Example request using vanilla fetch: Revoke access token.
        await fetch(`${this.lichessHost}/api/token`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
