
export interface TrackFilters {
    search: string;
    sorting: {
        tempo: number;
        loudness: number;
        duration_ms: number;
        [key: string]: number;
    };
}
