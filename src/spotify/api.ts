class Spotify {
  baseUrl = "https://api.spotify.com/v1";
  redirectUri = "http://localhost:3000/"
  clientId = "56b3e61755c4412da05579ef18851833";
  _access_token?: string;
  constructor(access_token?: string) {
    console.log(access_token);
    this._access_token = access_token;
  }

  handleOAuthCallback() {
    var fragmentString = window.location.hash.substring(1);

    // Parse query string to see if page request is coming from OAuth 2.0 server.
    var params: any = {};
    var regex = /([^&=]+)=([^&]*)/g, m;
    // eslint-disable-next-line no-cond-assign
    while (m = regex.exec(fragmentString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    this._access_token = params["access_token"];
  }

  async get(endpoint: string, abortSignal?: AbortSignal) {
    if (this._access_token == null) {
      this.handleOAuthCallback();
    }

    const url: string = this.baseUrl + endpoint;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this._access_token}`,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      signal: abortSignal,
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(`Gretchen, this fetch is so not ok! ${response.status}: ${url}`);
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