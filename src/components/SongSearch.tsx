"use client";

import { useEffect, useState } from "react";
import type { Song } from "@/types/song";
import SongProfile from "@/components/SongProfile";


export default function SongSearch() {

    const [search, setSearch] = useState(""); // what the user searches for
    const [selectedSong, setSelectedSong] = useState<Song | null>(null); // the song that the user has selected by clicking on it
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]); // the filtered songs (20 most popular) based on the search query
    const [debouncedSearch, setDebouncedSearch] = useState(""); // the search query that is debounced to avoid unnecessary API calls (this is what actually gets sent to the API)

    // fetches filtered songs search results from API
    useEffect(() => {
        async function fetchSongs() {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(debouncedSearch)}`
            );

            const songs: Song[] = await response.json();

            setFilteredSongs(songs);
        }

        fetchSongs();
    }, [debouncedSearch]);

    // debounces the search query
    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);

    }, [search]);


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