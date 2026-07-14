"use client";

import { useState } from "react";
import { songs } from "@/data/songs";

export default function SongSearch() {

    const [search, setSearch] = useState("");


    // For every song, check if the title or artist matches the search
    const filteredSongs = songs.filter((song) => {

        const searchWords = search.toLowerCase().split(" "); // what the user searched for

        // make search easier by splitting the title and artist into words instead of just one string
        const titleWords = song.title.toLowerCase().split(" ");
        const artistWords = song.artist.toLowerCase().split(" ");

        // "does at least one word in the title or artist start with the search term?"

        return searchWords.every((searchWord) => (
            titleWords.some((word) => word.startsWith(searchWord)) ||
            artistWords.some((word) => word.startsWith(searchWord))
        ));
    });

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search for a song or artist..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)} // every time the input changes, save its current value in 'search'
                />
            </div>
            <div>
                {filteredSongs.map((song) => (
                    <button key={song.id}>
                        <h2>{song.title}</h2>
                        <p>{song.artist}</p>
                    </button>
                ))}
            </div>
        </>
    )
}