import fs from "fs";
import path from "path";
import csv from "csv-parser";
import type { Song } from "../src/types/song";

const inputPath = path.join(
    process.cwd(),
    "data",
    "songs-v2.csv"
);

const outputPath = path.join(
    process.cwd(),
    "src",
    "data",
    "songs-v2.json"
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
    .on("data", (row) => {

        const identifier = `${row.name}|${row.track_artists}`;

        if (seenSongs.has(identifier)) {
            return;
        }

        seenSongs.add(identifier);

        const keyIndex = Number(row.key);

        const song: Song = {
            id: row.track_id,

            title: row.name,
            artist: row.track_artists,

            // This dataset doesn't have albums
            album: "",

            popularity: Number(row.popularity),

            // Use the first listed genre
            genre: row.genres
                ? row.genres.split(",")[0].trim()
                : "Unknown",

            bpm: Number(row.tempo),

            key:
                keyIndex >= 0 && keyIndex < KEY_NAMES.length
                    ? KEY_NAMES[keyIndex]
                    : "Unknown",

            mode: row.mode === "1" ? "major" : "minor",

            energy: Number(row.energy),
            danceability: Number(row.danceability),
            valence: Number(row.valence),

            // Dataset doesn't have duration
            durationMs: 0,
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
    })
    .on("data", (row) => {

        console.log(row);
        process.exit(0);
    })
;
