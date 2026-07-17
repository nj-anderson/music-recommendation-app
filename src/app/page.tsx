import SongSearch from "@/components/SongSearch";

export default function Home() {
    return (
        <main>
            <h1>Music Recommender</h1>

            <p>
                Discover music based on musical characteristics.
            </p>

            <SongSearch />

        </main>
    );
}