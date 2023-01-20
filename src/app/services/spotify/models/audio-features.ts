export interface AudioFeaturesResponse {
    audio_features: AudioFeatures[];
}

export interface AudioNumericalFeatures {
    acousticness: number,
    danceability: number,
    energy: number,
    instrumentalness: number,
    liveness: number,
    speechiness: number,
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
export interface AudioFeatures extends AudioNumericalFeatures {
    key: number;
    mode: number;
    valence: number;
    type: 'audio_features';
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    duration_ms: number;
    time_signature: number;
    loudness: number,
    tempo: number,  // BPM
}
