# **Soundbound**

Playing with the Spotify API, es6/TypeScript, and React.

## Features so far:
### Client-side authentication via Spotify
* Only Spotify account needed
* Auth is done purely in a user's browser with no server side
### Login to see what Spotify knows about you!
* Profile picture & name
* Top Artists
    * Click on artists for more information like genre tags (these are quite granular which is cool)
    * 3 different periods
        1. long_term (calculated from several years of data and including all new data as it becomes available)
        2. medium_term (approximately last 6 months)
        3. short_term (approximately last 4 weeks)
* Top Tracks
    * Play quick 30 second previews of tracks - Great for finding music!
    * 3 different periods (see Top Artists)
* Music Player (under construction)
    * Basic track info
    * Play/Pause track
    * Add to and View Play Queue

## To the Future
* Full-featured music player: Skip/Prev, GoTo/TimeSlider, Pic-In-Pic
* Connect Player
    - Full track playback, Controller
* Lab - generate playlists
    - "Give me tracks like these(0-5) artists, (0-5) tracks, (0-5) genres"
    - Filter(_or prefer_) by a slew of track attributes like acousticness, danceability, energy, instrumentalness, key, liveness, loudness, mode(major/minor), popularity, speechiness, tempo, time signature, valence(high = more positive (e.g. happy, cheerful, euphoric), low = more negative (e.g. sad, depressed, angry))
* Viz stuff (this would be cool)
    - graph or chart of Top Tracks genres --- change-over-time?
        * play Sound Of {genre} button
    - map of top artists locations --- change-over-time?
* Browse/Search
    - artists(by location?), tracks, albums(by year?)
    - genres & playlists (?)
* Playlists

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## **Developing**

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
