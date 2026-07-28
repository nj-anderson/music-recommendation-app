import type { Song } from "@/types/song";

export function recommendSongs(
    selectedSong: Song,
    songs: Song[]
): Song[] {

    return songs

        // Exclude the selected song from the recommendations
        .filter(song => song.id !== selectedSong.id)

        // Calculate the similarity score against each song
        .map(song => ({
            song,
            score: similarityScore(selectedSong, song),
        }))

        // Sort to by lowest to highest scores
        .sort((a,b) => a.score - b.score)

        // Keep only the top 8 songs
        .slice(0,8)

        // Extract the songs from the sorted results
        .map(result => result.song);

}


// Songs with the lowest similarity score are considered the most similar
function similarityScore(song1: Song, song2: Song): number {

    let score = 0;

    // Energy - 25% weight
    score += Math.abs(song1.energy - song2.energy) * 0.25;

    // Danceability - 25% weight
    score += Math.abs(song1.danceability - song2.danceability) * 0.25;

    // Valence (Happiness) - 20% weight
    score += Math.abs(song1.valence - song2.valence) * 0.2;

    // BPM - 15% weight
    score += Math.abs(song1.bpm - song2.bpm) * 0.15;

    // Genre - 10% weight
    if (song1.genre !== song2.genre) {
        score += 10;
    }

    // Key - 3% weight
    if (song1.key !== song2.key) {
        score += 3;
    }

    // Major / Minor - 2% weight
    if (song1.mode !== song2.mode) {
        score += 2;
    }

    return score;
}