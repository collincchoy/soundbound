class SpotifyClient {
  baseUrl = "https://api.spotify.com/v1";
  redirectUri = `${process.env.REACT_APP_REDIRECT_HOST}/oauth_callback`;
  clientId = "56b3e61755c4412da05579ef18851833";
  private _access_token: string; // DO NOT EDIT THIS DIRECTLY - use setter/getter
  constructor(access_token?: string) {
    this._access_token = access_token ?? "";
  }

  get access_token() {
    return this._access_token || localStorage.getItem("token");
  }

  set access_token(token: string | null) {
    if (!!token) {
      localStorage.setItem("token", token);
      this._access_token = token;
    } else {
      localStorage.removeItem("token");
      this._access_token = "";
    }
  }

  handleOAuthCallback() {
    var fragmentString = window.location.hash.substring(1);

    // Parse query string to see if page request is coming from OAuth 2.0 server.
    var params: any = {};
    var regex = /([^&=]+)=([^&]*)/g,
      m;
    // eslint-disable-next-line no-cond-assign
    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    if (params["access_token"]) {
      this.access_token = params["access_token"];
      // ~clear the url bar~
      // Note: this redirect is now done in the OauthCallback component.
      // This handler func should _only_ deal with the client api and not
      // handle page redirects.
    }
  }

  async get<T>(
    endpoint: string,
    abortSignal?: AbortSignal,
    params?: {}
  ): Promise<T> {
    if (params) {
      params = new URLSearchParams(params);
      endpoint = `${endpoint}?${params.toString()}`;
    }
    const url: string = this.baseUrl + endpoint;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      signal: abortSignal
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(
        `Gretchen, this fetch is so not ok! ${response.status}: ${url}`
      );
      throw await response.json();
    }
    return response.json();
  }

  get authorizeUrl() {
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params: Record<string, string> = {
      client_id: this.clientId,
      response_type: "token",
      redirect_uri: this.redirectUri,
      // state: undefined,
      scope: "user-read-private user-read-email user-top-read",
      show_dialog: true.toString()
    };
    authUrl.search = String(new URLSearchParams(params));
    return authUrl;
  }

  login = () => {
    window.location.href = this.authorizeUrl.toString();
  };

  logout = () => {
    this.access_token = null;
    // refresh page
    // window.history.go(0);
  };
}

export const spotify = new SpotifyClient();
