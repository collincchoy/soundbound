
class Spotify {
    baseUrl = "https://api.spotify.com/v1";
    redirectUri = "http://localhost:3000/"
    clientId = "56b3e61755c4412da05579ef18851833";
    constructor(access_token) {
        console.log(access_token);
        this._access_token = access_token;
    }

    handleOAuthCallback() {
        var fragmentString = window.location.hash.substring(1);

        // Parse query string to see if page request is coming from OAuth 2.0 server.
        var params = {};
        var regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        this._access_token = params["access_token"];
    }

    async fetch(url, options) {
        if (this._access_token === undefined) {
            this.handleOAuthCallback()
        }

        if (options.headers) {
            options.headers.Authorization = `Bearer ${this._access_token}`;
            options.headers.Accept = "application/json";
            options.headers["Content-Type"] = "application/json";
        }
        console.log(JSON.stringify(options));
        const response = await fetch(url, options);
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText
            });
        }
    }

    get authorizeUrl() {
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        const params = {
            client_id: this.clientId,
            response_type: "token",
            redirect_uri: this.redirectUri,
            // state: undefined,
            scope: "user-read-private user-read-email user-top-read",
            show_dialog: true,
        };
        authUrl.search = new URLSearchParams(params);
        return authUrl;
    }
}

export const spotify = new Spotify();