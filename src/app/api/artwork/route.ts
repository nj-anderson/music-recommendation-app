import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const title = request.nextUrl.searchParams.get("title");
    const artist = request.nextUrl.searchParams.get("artist");

    if (!title || !artist) {
        return NextResponse.json({
            artwork: null,
            preview: null,
        });
    }

    const term = encodeURIComponent(`${title} ${artist}`);

    const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`
    );

    const data = await response.json();

    if (data.resultCount === 0) {
        return NextResponse.json({
            artwork: null,
            preview: null,
        });
    }

    const result = data.results[0];

    const artwork = result.artworkUrl100?.replace(
        "100x100",
        "600x600"
    ) ?? null;

    const preview = result.previewUrl ?? null;

    return NextResponse.json({
        artwork,
        preview,
    });
}