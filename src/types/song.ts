// the properties of each song in the dataset

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

    country?: string;

    artwork?: string | null;
    preview?: string | null;
};