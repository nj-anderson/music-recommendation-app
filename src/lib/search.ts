import type { Song } from "@/types/song";

export function searchSongs(
    songs: Song[],
    query: string
): Song[] {

    const searchWords = query
        .toLowerCase()
        .trim()
        .split(/\s+/);

    return songs.filter((song) => {

        const titleWords = song.title
            .toLowerCase()
            .split(/\s+/);

        const artistWords = song.artist
            .toLowerCase()
            .split(/\s+/);
        return searchWords.every((searchWord) =>
            titleWords.some((word) =>
                word.startsWith(searchWord)
            ) ||
            artistWords.some((word) =>
                word.startsWith(searchWord)
            )
        );
    })
        .sort((a, b) => b.popularity - a.popularity) // makes more popular songs appear first
        .slice(0, 12); // limits the number of results to 20
}