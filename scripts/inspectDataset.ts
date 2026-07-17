import fs from "fs";
import path from "path";
import csv from "csv-parser";

const filePath = path.join(
    process.cwd(),
    "data",
    "spotify-tracks-dataset-detailed.csv"
);

let rowCount = 0;

const uniqueSongs = new Set<string>();
let duplicateCount = 0;

fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
        rowCount++;

        const identifier =
            `${row.track_name}|${row.artists}`;

        if (uniqueSongs.has(identifier)) {
            duplicateCount++;
        } else {
            uniqueSongs.add(identifier);
        }
    })
    .on("end", () => {
        console.log("Rows:", rowCount);
        console.log("Unique Songs:", uniqueSongs.size);
        console.log("Duplicates:", duplicateCount);
    });