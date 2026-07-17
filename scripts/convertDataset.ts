import fs from "fs";
import path from "path";
import csv from "csv-parser";
import type { Song } from "../src/types/song";

const inputPath = path.join(
    process.cwd(),
    "data",
    "spotify-tracks-dataset-detailed.csv"
);

const outputPath = path.join(
    process.cwd(),
    "src",
    "data",
    "songs.json"
);

const KEY_NAMES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

const songs: Song[] = [];

const seenSongs = new Set<string>();

fs.createReadStream(inputPath)
    .pipe(csv())
    .on("data", (row) => { // for every row in the csv file

        const identifier = `${row.track_name}|${row.artists}`;

        if (seenSongs.has(identifier)) {
            return;
        }

        seenSongs.add(identifier);

        const keyIndex = Number(row.key);

        const song: Song = {
            id: row.track_id,

            title: row.track_name,
            artist: row.artists,
            album: row.album_name,

            popularity: Number(row.popularity),

            genre: row.track_genre,

            bpm: Number(row.tempo),

            key: keyIndex === -1 ? "Unknown" : KEY_NAMES[keyIndex],
            mode: row.mode === "1" ? "major" : "minor",

            energy: Number(row.energy),
            danceability: Number(row.danceability),
            valence: Number(row.valence),

            durationMs: Number(row.duration_ms),
        };

        songs.push(song);
    })
    .on("end", () => {

        fs.writeFileSync(
            outputPath,
            JSON.stringify(songs, null, 2)
        );

        console.log(`Converted ${songs.length} songs.`);
        console.log(`Saved to ${outputPath}`);

    });