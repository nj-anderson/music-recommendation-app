"use client";

import { useState } from "react";
import type { Song } from "@/types/song";
import songsData from "@/data/songs.json"; // going to be replaces with api route for faster data fetching
import SongProfile from "@/components/SongProfile";
import {searchSongs} from "@/lib/search";

const songs = songsData as Song[];

export default function SongSearch() {

    const [search, setSearch] = useState("");
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);


    // OLD VERSION
    // For every song, check if the title or artist matches the search
    // const filteredSongs = songs.filter((song) => {
    //
    //     const searchWords = search.toLowerCase().split(" "); // what the user searched for
    //
    //     // make search easier by splitting the title and artist into words instead of just one string
    //     const titleWords = song.title.toLowerCase().split(" ");
    //     const artistWords = song.artist.toLowerCase().split(" ");
    //
    //     // "does at least one word in the title or artist start with the search term?"
    //
    //     return searchWords.every((searchWord) => (
    //         titleWords.some((word) => word.startsWith(searchWord)) ||
    //         artistWords.some((word) => word.startsWith(searchWord))
    //     ));
    // });

    const filteredSongs = searchSongs(
        songs,
        search
    );

    return (
        <>
            <br/>
            <div>
                <input
                    type="text"
                    style={{ width: "250px" }}
                    placeholder="Search for a song or artist..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)} // every time the input changes, save its current value in 'search'
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "50px",
                }}
            >
                {filteredSongs.map((song) => (
                    <button
                        key={song.id}
                        onClick={() => setSelectedSong(song)}
                    >
                        <h2>{song.title}</h2>
                        <p>{song.artist}</p>
                    </button>
                ))}
            </div>
            <br/>

            {/*testing - conditional rendering*/}
            {selectedSong && (
                <SongProfile song={selectedSong} />
            )}
        </>
    )
}