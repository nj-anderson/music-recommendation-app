import { NextRequest, NextResponse } from "next/server";

/* GET /api/artwork*/
/* Retrieves album artwork and preview URL for a given song from the iTunes API */

export async function GET(request: NextRequest) {

    // receives request like /api/artwork?title=God's%20Plan&artist=Drake

    // extracts the title and artist from the URL
    const title = request.nextUrl.searchParams.get("title");
    const artist = request.nextUrl.searchParams.get("artist");

    // if either title or artist is missing, return null - don't try to fetch artwork from iTunes API
    if (!title || !artist) {
        return NextResponse.json({
            artwork: null,
            preview: null,
        });
    }

    // create the iTunes API search term
    const term = encodeURIComponent(`${title} ${artist}`);

    // fetch song from iTunes API, get the first result
    const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`
    );

    // convert the respone from JSON to javascript object
    const data = await response.json();

    // check if the song was found, if not, return null
    if (data.resultCount === 0) {
        return NextResponse.json({
            artwork: null,
            preview: null,
        });
    }

    // get the first result
    const result = data.results[0];

    // get the artwork from the song, convert the 100x100 resolution to 600x600
    const artwork = result.artworkUrl100?.replace(
        "100x100",
        "600x600"
    ) ?? null;

    // get the preview URL from the song
    const preview = result.previewUrl ?? null;

    // send the artwork and preview URL back to the frontend
    return NextResponse.json({
        artwork,
        preview,
    });
}