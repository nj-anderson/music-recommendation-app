export type Song = {
    id: string;

    title: string;
    artist: string;
    album: string;

    popularity: number;
    genre: string;

    bpm: number;

    key: string;
    mode: "major" | "minor";

    energy: number;
    danceability: number;
    valence: number;

    durationMs: number;
};