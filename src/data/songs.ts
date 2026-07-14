import { Song } from "@/types/song";

/* This is dummy data for now. Replace this with actual data from a database later. */
/* Possible data: https://musicbrainz.org/ */

export const songs: Song[] = [
    {
        id: "1",
        title: "Midnight Drive",
        artist: "Example Artist",
        bpm: 118,
        key: "F#",
        mode: "minor",
        energy: 0.82,
        danceability: 0.71,
        valence: 0.42,
    },
    {
        id: "2",
        title: "Neon Lights",
        artist: "Example Artist 2",
        bpm: 122,
        key: "F#",
        mode: "minor",
        energy: 0.79,
        danceability: 0.75,
        valence: 0.45,
    },
    {
        id: "3",
        title: "Summer Morning",
        artist: "Example Artist 3",
        bpm: 92,
        key: "C",
        mode: "major",
        energy: 0.45,
        danceability: 0.52,
        valence: 0.81,
    },
];