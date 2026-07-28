"use client";

import { useEffect, useState, useRef } from "react";
import type { Song } from "@/types/song";
import SongProfile from "@/components/SongProfile";
import { Play, Pause } from "lucide-react";

export default function SongSearch() {

    const [search, setSearch] = useState(""); // what the user searches for
    const [selectedSong, setSelectedSong] = useState<Song | null>(null); // the song that the user has selected by clicking on it
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]); // the filtered songs (20 most popular) based on the search query
    const [debouncedSearch, setDebouncedSearch] = useState(""); // the search query that is debounced to avoid unnecessary API calls (this is what actually gets sent to the API)
    const [recommendations, setRecommendations] = useState<Song[]>([]); // stores the recommendations for the selected song
    const [playingSongId, setPlayingSongId] = useState<string | null>(null);
    const [currentPreview, setCurrentPreview] = useState<string | null>(null); // stores the URL of the current preview audio file


    const audioRef = useRef<HTMLAudioElement | null>(null);
    const recommendationsRef = useRef<HTMLDivElement>(null);


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

            // fetch album artwork for each song
            const updatedSongs = await Promise.all(
                songs.map(async (song) => {
                    try {
                        const res = await fetch(
                            `/api/artwork?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`
                        );

                        const data = await res.json();

                        return {
                            ...song,
                            artwork: data.artwork,
                            preview: data.preview,
                        };
                    } catch {
                        return {
                            ...song,
                            artwork: null,
                            preview: null,
                        };
                    }
                })
            );

            setFilteredSongs(updatedSongs);
        }

        void fetchSongs();
    }, [debouncedSearch]);

    // debounces the search query
    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);

    }, [search]);

    // button handler that generates recommendations for the selected song
    async function handleGenerateRecommendations() {

        if (!selectedSong) {
            return;
        }

        const response = await fetch("/api/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedSong),
        });

        const recommendations: Song[] = await response.json();

        // Fetch album artwork for each recommended song
        const updatedRecommendations = await Promise.all(
            recommendations.map(async (song) => {
                try {
                    const response = await fetch(
                        `/api/artwork?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`
                    );

                    const data = await response.json();

                    return {
                        ...song,
                        artwork: data.artwork,
                        preview: data.preview,
                    };
                } catch {
                    return {
                        ...song,
                        artwork: null,
                        preview: null,
                    };
                }
            })
        );

        setRecommendations(updatedRecommendations);

        requestAnimationFrame(() => {
            recommendationsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }


    function handlePreview(song: Song) {
        if (!song.preview) return;

        const audio = audioRef.current;
        if (!audio) return;

        if (playingSongId === song.id) {
            audio.pause();
            setPlayingSongId(null);
            return;
        }

        audio.src = song.preview;
        audio.play();

        setCurrentPreview(song.preview);
        setPlayingSongId(song.id);
    }


    return (
        <>
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
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setSelectedSong(null);
                        setRecommendations([]);
                        setPlayingSongId(null);

                        if (audioRef.current) {
                            audioRef.current.pause();
                        }
                    }} // every time the input changes, save its current value in 'search'
                />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
                {filteredSongs.map((song) => (
                    <button
                        key={song.id}
                        onClick={() => {
                            setSelectedSong(song);
                            setFilteredSongs([]);
                            setSearch("");
                        }}
                        className="
                            w-52
                            rounded-2xl
                            overflow-hidden
                            bg-white/5
                            backdrop-blur-md
                            border border-white/10
                            shadow-lg
                            hover:shadow-pink-500/20
                            hover:scale-105
                            transition-all
                            duration-200"
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
                            <h2 className="font-semibold text-lg truncate">
                                {song.title}
                            </h2>

                            <p className="mt-1 text-sm text-gray-300 truncate">
                                {song.artist.split(";").join(", ")}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* conditional rendering */}
            {selectedSong && (
                <div className="mt-12 flex justify-center">
                    <SongProfile
                        song={selectedSong}
                        onGenerateRecommendations={handleGenerateRecommendations}
                    />
                </div>
            )}


            {/*displays the recommendations for the selected song*/}
            {recommendations.length > 0 && (
                <div ref={recommendationsRef} className="mt-12">
                    <h2 className="mb-6 text-center text-3xl font-bold">
                        Recommended Songs
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6">
                        {recommendations.map((song) => (
                            <div
                                key={song.id}
                                className="
                        w-52
                        rounded-2xl
                        overflow-hidden
                        bg-white/5
                        backdrop-blur-md
                        border border-white/10
                        shadow-lg
                    "
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
                                    <h3 className="font-semibold truncate">
                                        {song.title}
                                    </h3>

                                    <p className="text-sm text-gray-300 truncate">
                                        {song.artist.split(";").join(", ")}
                                    </p>
                                </div>


                                <div className="mt-1 flex justify-center">
                                    {song.preview ? (
                                        <div className="mb-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePreview(song);
                                            }}
                                            className="
                                                flex
                                                h-14
                                                w-24
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-white/10
                                                text-white
                                                transition-all
                                                hover:scale-105
                                            "
                                        >
                                            {playingSongId === song.id ? (
                                                <Pause className="h-6 w-6 fill-white" />
                                            ) : (
                                                <Play className="ml-1 h-6 w-6 fill-white" />
                                            )}
                                        </button>
                            </div>
                                    ) : (
                                        <div className="mt-1.5">
                                        <button
                                            disabled
                                            className="
                                            rounded-lg
                                            bg-white/10
                                            px-4
                                            py-3
                                            text-gray-400
                                            cursor-not-allowed
                                        "
                                        >
                                            Preview Unavailable
                                        </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}
            <audio
                ref={audioRef}
                hidden
                onEnded={() => setPlayingSongId(null)}
            />
        </>
    );
}