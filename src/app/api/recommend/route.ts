import songs from "@/data/activeData";
import {recommendSongs} from "@/lib/recommend";
import {Song} from "@/types/song";

/* POST /api/recommend */
/* Handles the recommendation request from the frontend */

export async function POST(request: Request) {
    const selectedSong = await request.json(); // frontend sends the selected song

    // runs the recommendation algorithm (recommend.ts) on the selected song
    const recommendations = recommendSongs(
        selectedSong,
        songs as Song[]
    );

    return Response.json(recommendations); // converts resulting recommendations back to json and sends to frontend
}