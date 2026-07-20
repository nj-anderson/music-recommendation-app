import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const title = request.nextUrl.searchParams.get("title");
    const artist = request.nextUrl.searchParams.get("artist");

    if (!title || !artist) {
        return NextResponse.json({ artwork: null });
    }

    const term = encodeURIComponent(`${title} ${artist}`);

    const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`
    );

    const data = await response.json();

    if (data.resultCount === 0) {
        return NextResponse.json({ artwork: null });
    }

    const artwork = data.results[0].artworkUrl100.replace(
        "100x100",
        "600x600"
    );

    return NextResponse.json({ artwork });
}