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

    tempoDataObj: {
        name: string;
        value: number;
    }[] = [];

    private _playlist!: SimplePlaylist;

    featureMetrics: Features = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        speechiness: 0,
    };

    featureRadarData?: {
        name: string;
        series: {
            name: string;
            value: number;
        }[];
    }[];

    tempoDistributionStep = 5;

    tempoDistribution: {
        [key: number]: number
    } = {};

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

        const featureRadarDataArr = Object.entries(this.featureMetrics);

        const featureRadarDataObj = featureRadarDataArr.map(([k, v]) => ({
            name: k,
            value: v
        }));

        this.featureRadarData = [{
            name: 'Features',
            series: featureRadarDataObj
        }];

        for(let track of this._playlist.tracks.items) {
            let bpm = track.features?.tempo;

            if(!bpm) continue;

            bpm = Math.round(bpm);

            bpm /= this.tempoDistributionStep;

            bpm = Math.round(bpm);

            bpm *= this.tempoDistributionStep;

            if(!this.tempoDistribution[bpm]) this.tempoDistribution[bpm] = 0;

            this.tempoDistribution[bpm]++;
        }

        const max = Math.max(...(Object.keys(this.tempoDistribution) as unknown as number[]));

        const tempoDataObj: {
                name: string;
                value: number;
            }[] = []

        for(let i = 0; i <= max + (this.tempoDistributionStep / 2); i += this.tempoDistributionStep) {
            tempoDataObj.push({
                name: i.toString(),
                value: this.tempoDistribution[i] || 0
            })
        }

        this.tempoDataObj = tempoDataObj;
    }

    get playlist(): SimplePlaylist {
        return this._playlist;
    }

    constructor() {}

    ngOnInit(): void {}
}
