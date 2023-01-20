import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    switchMap,
    BehaviorSubject,
    combineLatest,
    debounceTime,
    filter,
    Observable,
} from 'rxjs';
import { SpotifyPlaylist } from './services/spotify/models/spotify-playlist';
import { TrackFilters } from './services/spotify/models/track-filters';
import { SpotifyApiService } from './services/spotify/spotify-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    round = Math.round;
    searchValue$ = new BehaviorSubject<string>('');
    token$ = this.spotify.getToken();
    playlistID$ = new BehaviorSubject<string>('0UA4PppdcKIKojVy5iSVoD');

    trackFilters: TrackFilters = {
        search: '',
        sorting: {
            tempo: 0,
            loudness: 0,
            duration_ms: 0
        },
    };

    // https://open.spotify.com/playlist/0UA4PppdcKIKojVy5iSVoD
    playlist$ = combineLatest(this.playlistID$, this.token$).pipe(
        switchMap(([playlistID, token]) =>
            this.spotify.playlist(playlistID, token)
        )
    );

    search$ = combineLatest(
        this.searchValue$.pipe(debounceTime(500)),
        this.token$
    ).pipe(
        switchMap(
            ([search, token]) =>
                this.spotify.searchPlaylists(search, token) as Observable<
                    SpotifyPlaylist[]
                >
        )
    );

    constructor(private spotify: SpotifyApiService) {
        this.search$.subscribe((x) => console.log('Search:', x));
    }

    setFilter(key: string, value: number) {
        for(let [k,v] of Object.entries(this.trackFilters.sorting)) {
            this.trackFilters.sorting[k] = 0;
        }

        this.trackFilters.sorting[key] = value;
    }
}
