import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, BehaviorSubject, combineLatest, debounceTime, filter, Observable } from 'rxjs';
import { SpotifyPlaylist } from './services/spotify/models/spotify-playlist';
import { SpotifyApiService } from './services/spotify/spotify-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    searchValue$ = new BehaviorSubject<string>('');
    token$ = this.spotify.getToken();
    playlistID$ = new BehaviorSubject<string>('0UA4PppdcKIKojVy5iSVoD');
    log = console.log

    // https://open.spotify.com/playlist/0UA4PppdcKIKojVy5iSVoD
    playlist$ = combineLatest(
        this.playlistID$,
        this.token$
    ).pipe(
        switchMap(([playlistID, token]) =>
            this.spotify.playlist(playlistID, token)
        )
    );

    search$ = combineLatest(
        this.searchValue$.pipe(debounceTime(500)),
        this.token$
    ).pipe(
        switchMap(([search, token]) =>
            this.spotify.searchPlaylists(search, token) as Observable<SpotifyPlaylist[]>
        )
    );

    constructor(private spotify: SpotifyApiService) {
        this.search$.subscribe((x) => console.log('Search:', x));
    }
}
