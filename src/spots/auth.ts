import { ResponseType } from "./types";

interface RequestHeaders {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
}

class Spotify {
    baseUrl = "https://api.spotify.com/v1";
    redirectUri = "http://localhost:3000/"
    clientId = "56b3e61755c4412da05579ef18851833";
    _access_token: string;
    constructor(access_token='') {
        console.log(access_token);
        this._access_token = access_token;
    }

    handleOAuthCallback() {
        var fragmentString = window.location.hash.substring(1);

        // Parse query string to see if page request is coming from OAuth 2.0 server.
        var params: any = {};
        var regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        this._access_token = params["access_token"];
    }

    async fetch(url: string, options: RequestInit): Promise<ResponseType> {
        if (this._access_token === undefined) {
            this.handleOAuthCallback();
        }

        let requiredHeaders: RequestHeaders = {
            'Authorization': '',//`Bearer ${this._access_token}`,
            'Accept': "application/json",
            "Content-Type": "application/json",
        }
        if (options.headers) {
            options.headers = {...options.headers, ...requiredHeaders};
        }
        console.log('BOO');
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log("this is not ok");
            throw await response.json();
        }
        return response.json();
    }

    get authorizeUrl(): URL {
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        const params: Record<string, string> = {
            client_id: this.clientId,
            response_type: "token",
            redirect_uri: this.redirectUri,
            // state: undefined,
            scope: "user-read-private user-read-email user-top-read",
            show_dialog: true.toString(),
        };
        authUrl.search = String(new URLSearchParams(params));
        return authUrl;
    }
}

export const spotify = new Spotify();