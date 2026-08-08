import songs from "@/data/activeData";
import { searchSongs } from "@/lib/search";
import type { Song } from "@/types/song";

/* GET /api/search*/
/* Queries the song data in the server for a given search query from the frontend */

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