"use client";

import { useEffect, useState } from "react";
import type { Song } from "@/types/song";
import SongProfile from "@/components/SongProfile";

type SongWithArtwork = Song & {
    artwork?: string | null;
};

export default function SongSearch() {

    const [search, setSearch] = useState(""); // what the user searches for
    const [selectedSong, setSelectedSong] = useState<Song | null>(null); // the song that the user has selected by clicking on it
    const [filteredSongs, setFilteredSongs] = useState<SongWithArtwork[]>([]); // the filtered songs (20 most popular) based on the search query
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

            const songsWithArtwork = await Promise.all(
                songs.map(async (song) => {
                    try {
                        const res = await fetch(
                            `/api/artwork?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`
                        );

                        const data = await res.json();

                        return {
                            ...song,
                            artwork: data.artwork,
                        };
                    } catch {
                        return {
                            ...song,
                            artwork: null,
                        };
                    }
                })
            );

            setFilteredSongs(songsWithArtwork);
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
            <div className="mt-8 px-10 py-5 grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
                {filteredSongs.map((song) => (
                    <button
                        key={song.id}
                        onClick={() => setSelectedSong(song)}
                        className="
                        rounded-2xl
                        overflow-hidden
                        bg-white/5
                        backdrop-blur-md
                        border border-white/10
                        hover:bg-white/10
                        transition
                        text-left"
                    >

                        {song.artwork ? (
                            <img
                                src={song.artwork}
                                alt={song.title}
                                className="w-full aspect-square object-cover"
                            />
                        ) : (
                            <div className="w-full aspect-square bg-white/10" />
                        )}

                        <div className="p-4">
                            <h2 className="font-semibold truncate">
                                {song.title}
                            </h2>

                            <p className="text-sm text-gray-300 truncate">
                                {song.artist.split(";").join(", ")}
                            </p>
                        </div>

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