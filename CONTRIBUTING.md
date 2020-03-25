This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## **Developing**

# Spotify

In order for Soundbound to connect to Spotify and provide useful information to users, you'll need to procure yourself an OAuth2 Client ID from Spotify. Instructions to do so are below.

> #### Why do I need to do this?
>
> To access user's personal data - namely, fetch the user's profile (name & picture) as well as their Top Tracks/Top Artists. Because this is private data, it requires the user's consent - thus the authorization flow where a user signs into Spotify. Additionally, because Soundbound is requesting the user's information on their behalf, Spotify requires applications to register themselves and the OAuth2 client id is what Soundbound uses to identify itself.

> Note the following instructions are from [here](https://developer.spotify.com/documentation/web-api/quick-start/).

### Set Up Your Account

To use the Web API, start by creating a Spotify user account (Premium or Free). To do that, simply sign up at www.spotify.com.

When you have a user account, go to the [Dashboard](https://developer.spotify.com/dashboard/) page at the Spotify Developer website and, if necessary, log in. Accept the latest Developer Terms of Service to complete your account set up.

### Register Your Application

Any application can request data from Spotify Web API endpoints and many endpoints are open and will return data without requiring registration. However, if your application seeks access to a user’s personal data (profile, playlists, etc.) it must be registered. Registered applications also get other benefits, like higher rate limits at some endpoints.

You can [register your application](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app), even before you have created it.

### During Registration

You can call the application whatever you'd like - a good choice might be `Soundbound - Dev`. You also need to whitelist a callback url. The callback handler is at `/oauth_callback` so for local development, use:

```
http://localhost:3000/oauth_callback
```

These are the only required settings you'll need. Grab a copy of the Client ID from the dashboard and then you can close it up.

## Configuration

If you open the `.env` file located at the root of the repository, there's an empty entry for the variable `REACT_APP_SPOTIFY_CLIENT_ID`. You can override that value with your client id by adding a `.env.local` file with the contents:

```
REACT_APP_SPOTIFY_CLIENT_ID=INSERT_YOUR_CLIENT_ID_HERE
```

> You can also paste your id into the `.env` file if you'd prefer, but don't commit it to source control.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
