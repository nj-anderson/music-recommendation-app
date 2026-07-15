import type { Song } from "@/types/song";

type SongProfileProps = {
    song: Song
};

export default function SongProfile({ song }: SongProfileProps) {
    return (
        <div>
            <h2>Selected Song:</h2>

            <h3>{song.title}</h3>
            <p>{song.artist}</p>

            <div>
                <p>BPM: {song.bpm}</p>
                <p>
                    Key: {song.key} {song.mode}
                </p>
                <p>Energy: {Math.round(song.energy * 100)}%</p>
                <p>
                    Danceability: {Math.round(song.danceability * 100)}%
                </p>
                <p>Valence: {Math.round(song.valence * 100)}%</p>
            </div>
        </div>
    );
}