import { SpotifyPlaylist } from './../../services/spotify/models/spotify-playlist';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PlaylistSearchResult } from 'src/app/services/spotify/spotify-api.service';

@Component({
    selector: 'app-search-playlist-element',
    templateUrl: './search-playlist-element.component.html',
    styleUrls: ['./search-playlist-element.component.scss'],
})
export class SearchPlaylistElementComponent implements OnInit {
    @Input() data!: SpotifyPlaylist;
    @Output() emitter = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
