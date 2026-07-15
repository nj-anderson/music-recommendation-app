export type Song = {

    id: string,
    title: string,
    artist: string,
    bpm: number,
    key: string,
    mode: "major" | "minor",
    energy: number,
    danceability: number,
    valence: number,
}