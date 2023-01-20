import { Component, Input, OnInit } from '@angular/core';
import { curveBundle, curveLinearClosed, line } from 'd3-shape';
import { AudioFeatures, AudioNumericalFeatures } from 'src/app/services/spotify/models/audio-features';
import { SimplePlaylist } from '../../services/spotify/models/simple-playlist';

interface Features extends AudioNumericalFeatures {
    [key: string]: number
}

@Component({
    selector: 'app-playlist-analysis',
    templateUrl: './playlist-analysis.component.html',
    styleUrls: ['./playlist-analysis.component.scss'],
})
export class PlaylistAnalysisComponent implements OnInit {
    line = curveLinearClosed;

    private _playlist!: SimplePlaylist;

    view: [number, number] = [400, 300];

    featureMetrics: Features = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        speechiness: 0,
    };

    tempoDistribution: {
        [key: number]: number
    } = {};

    get featureRadar() {
        const dataArr = Object.entries(this.featureMetrics);

        const dataObj = dataArr.map(([k, v]) => ({
            name: k,
            value: v
        }));

        return [{
            name: 'Features',
            series: dataObj
        }];
    }

    get featureMetricsList() {
        return Object.entries(this.featureMetrics);
    }

    @Input() set playlist(value: SimplePlaylist) {
        this._playlist = value;

        this.featureMetrics = {
            acousticness: 0,
            danceability: 0,
            energy: 0,
            instrumentalness: 0,
            liveness: 0,
            speechiness: 0,
        };

        this.tempoDistribution = {};

        for (let key of Object.keys(this.featureMetrics)) {
            for(let track of this._playlist.tracks.items) {
                const features = (track.features || {}) as Features;

                this.featureMetrics[key] += features[key] || 0;
            }

            this.featureMetrics[key] /= this._playlist.tracks.total;
        }


        for(let track of this._playlist.tracks.items) {
            const bpm = track.features?.tempo;

            if(!bpm) continue;

            if(!this.tempoDistribution[bpm]) this.tempoDistribution[bpm] = 0;

            this.tempoDistribution[bpm]++;
        }
    }

    get playlist(): SimplePlaylist {
        return this._playlist;
    }

    constructor() {}

    ngOnInit(): void {}
}
