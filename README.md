# **Soundbound**

Playing with the Spotify API, es6/TypeScript, and React.

- All functional components (mostly home-rolled)
- Hooks & Context API (No redux)

## Features so far:

### Client-side authentication via Spotify

- Only Spotify account needed
- Auth is done purely in a user's browser with no server side

### Login to see what Spotify knows about you!

- Profile picture & name
- Top Artists
  - Click on artists for more information like genre tags (these are quite granular which is cool)
  - 3 different periods
    1. long_term (calculated from several years of data and including all new data as it becomes available)
    2. medium_term (approximately last 6 months)
    3. short_term (approximately last 4 weeks)
- Top Tracks
  - Play quick 30 second previews of tracks - Great for finding music!
  - 3 different periods (see Top Artists)
- Music Player (under construction)
  - Basic track info
  - Play/Pause track
  - Add to and View Play Queue
- Lab
  - Generate playlists given 1 artist, track, and/or genre
  - Filter(_or prefer_) by a slew of track attributes like acousticness, danceability, energy, instrumentalness, key, liveness, loudness, mode(major/minor), popularity, speechiness, tempo, time signature, valence(high = more positive (e.g. happy, cheerful, euphoric), low = more negative (e.g. sad, depressed, angry))

## To the Future

- Full-featured music player: Skip/Prev, GoTo/TimeSlider, Pic-In-Pic
- Lab (improvement)
  - Support up-to-five artists, tracks, and/or genres
  - Save-as or Add-to playlist
- Artist/Genre infinite graph discovery
  - interactive graph to explore related artists/genres
- Connect Player
  - Full track playback, Controller
- Viz stuff (this would be cool)
  - graph or chart of Top Tracks genres --- change-over-time?
    - play Sound Of {genre} button
  - map of top artists locations --- change-over-time?
- Browse/Search
  - artists(by location?), tracks, albums(by year?)
  - genres & playlists (?)
- Playlists
