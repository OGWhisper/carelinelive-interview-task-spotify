![image](https://user-images.githubusercontent.com/43283965/213624739-f0d06426-33f6-48c1-81b2-a5269b41b8e5.png)
![image](https://user-images.githubusercontent.com/43283965/213624781-d340f2f6-ec52-4bd6-90ff-787e5d65ced6.png)

# CareLineLive Interview Task - Spotify

This repository contains a scaffolded Angular application for interacting with the Spotify API. It serves as a open-ended starting point for CareLineLive technical tests.

## Configuration
Create a file called `credentials.ts` in `src/environments` and add the following, filling in your Spotify App Client ID & Secret:
```typescript
export const CLIENT_ID = '';
export const CLIENT_SECRET = '';
```

`/src/environments/credentials.ts` is included in the `.gitignore` to ensure credentials aren't pushed to the repository.

## App structure
This is a very basic Angular application, with no routing. Once you've added the Spotify API credentials, starting the app should load and display a playlist. 

`SpotifyApiService` will fetch a playlist, all of it's tracks, and their audio features.

## Spotify API Reference
https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features

## Development server

Run `ng serve`, or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
