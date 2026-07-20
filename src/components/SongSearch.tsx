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

            // early return so that no results show before the user begins searching
            if (!debouncedSearch.trim()) {
                setFilteredSongs([]);
                return;
            }

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
            <div className="flex justify-center mt-10 mb-8">
                <input
                    className="
                    w-full
                    max-w-xl
                    rounded-full
                    bg-black/40
                    backdrop-blur-md
                    border
                    border-white/10
                    px-6
                    py-4
                    text-lg
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    transition
                    duration-200
                    focus:border-pink-400/70
                    focus:ring-2
                    focus:ring-pink-400/30 "

                    type="text"
                    placeholder="Search for a song or artist..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSongs.map((song) => (
                    <button
                        key={song.id}
                        onClick={() => setSelectedSong(song)}
                        className="
                rounded-xl
                bg-white/5
                border border-white/10
                p-4
                text-left
                backdrop-blur-md
                transition
                hover:bg-white/10
                hover:scale-105
            "
                    >
                        <h2 className="font-semibold text-lg truncate">
                            {song.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-300 truncate">
                            {song.artist.split(";").join(", ")}
                        </p>
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