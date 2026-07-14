import { songs } from "@/data/songs";

export default function Home() {
    return (
        <main>
            <h1>Beyond Genre</h1>

            <p>
                Discover music based on musical characteristics.
            </p>

            <h2>Songs</h2>

            {songs.map((song) => (
                <div key={song.id}>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <p>BPM: {song.bpm}</p>
                    <p>
                        Key: {song.key} {song.mode}
                    </p>
                    <p>Energy: {song.energy}</p>
                    <p>Danceability: {song.danceability}</p>
                    <p>Valence: {song.valence}</p>
                </div>
            ))}
        </main>
    );
}