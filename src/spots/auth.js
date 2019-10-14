
class Spotify {
    baseUrl = "https://api.spotify.com/v1";
    redirectUri = "http://e10a9535.ngrok.io"
    clientId = "8e5e658cbf0741bf94578990e8e52b90";
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
        return response.json();
    }

    get authorizeUrl() {
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        const params = {
            client_id: this.clientId,
            response_type: "token",
            redirect_uri: this.redirectUri,
            // state: undefined,
            // scope: undefined,
            show_dialog: true,
        };
        authUrl.search = new URLSearchParams(params);
        return authUrl;
    }
}

export const spotify = new Spotify("BQBzL_zuczZpKEYv_lqRraZSNDzmVi05Di8OeT_bEs1rTUeMcjY-9er40iDP87Q5LNxw3pQyvrSD88aQD2XdimNOZzG-Ju1n6MK5yAP4EISrvrtygtIovNgozIFUEFugeqEbrFvQy4LgCJKrR0WyjzLL_5dZf0SKSiqplGsRP9bcDKxcS3RKIrjexIyz790bE1k7NxNizKu3BRqWyiaUOJ5Rm7IC-Pd7f0q0GMY_evbSddntv4rvWD0a70JMvehimzY0VWKCMgOsya-3");