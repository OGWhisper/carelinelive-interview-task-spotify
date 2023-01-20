import { Pipe, PipeTransform } from '@angular/core';
import { AudioFeatures, AudioNumericalFeatures } from '../services/spotify/models/audio-features';
import { SimpleTrack } from '../services/spotify/models/simple-playlist';
import { TrackFilters } from '../services/spotify/models/track-filters';

interface Features extends AudioNumericalFeatures {
    [key: string]: number
}

@Pipe({
    name: 'trackSorting',
})
export class TrackSortingPipe implements PipeTransform {
    transform(value: SimpleTrack[], filters: TrackFilters): SimpleTrack[] {
        let data = value;

        if (filters.search) {
            data = data.filter((track) =>
                track.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        let found = false;

        for(let [k,v] of Object.entries(filters.sorting)) {
            if(v == 0) continue;

            found = true;

            data = data.sort((a,b) => {
                const aFeatures = (a.features || {}) as Features;
                const bFeatures = (b.features || {}) as Features;

                const aMetric = aFeatures[k] || 0;
                const bMetric = bFeatures[k] || 0;

                return v * (aMetric - bMetric);
            });

            break;
        }

        if(!found) {
            data = data.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        }

        return data;
    }
}
