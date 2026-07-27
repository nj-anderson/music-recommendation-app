import songs from "@/data/songs.json";
import {recommendSongs} from "@/lib/recommend";
import {Song} from "@/types/song";

export async function POST(request: Request) {
    const selectedSong = await request.json();

    const recommendations = recommendSongs(
        selectedSong,
        songs as Song[]
    );

    return Response.json(recommendations);
}