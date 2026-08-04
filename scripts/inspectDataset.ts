import fs from "fs";
import path from "path";
import csv from "csv-parser";

const filePath = path.join(
    process.cwd(),
    "data",
    "songs-v2.csv"
);

let rowCount = 0;

const uniqueSongs = new Set<string>();
let duplicateCount = 0;
let missingArtistsCount = 0;

fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
        rowCount++;

        const identifier =
            `${row.name}|${row.track_artists}`;

        if (uniqueSongs.has(identifier)) {
            duplicateCount++;
        } else {
            uniqueSongs.add(identifier);
        }
        if (!row.track_artists.trim()) {
            missingArtistsCount++;
        }
    })
    .on("end", () => {
        console.log("Rows:", rowCount);
        console.log("Unique Songs:", uniqueSongs.size);
        console.log("Duplicates:", duplicateCount);
        console.log("Missing Artists:", missingArtistsCount);
    });