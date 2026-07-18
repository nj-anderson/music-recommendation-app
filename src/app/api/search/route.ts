import songs from "@/data/songs.json";
import { searchSongs } from "@/lib/search";
import type { Song } from "@/types/song";

const songData = songs as Song[];

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") ?? "";

    const results = searchSongs(
        songData,
        query
    );

    return Response.json(results);

}