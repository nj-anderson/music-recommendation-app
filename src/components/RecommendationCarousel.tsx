// carousel used to display recommendations

"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import type { Song } from "@/types/song";

type Props = {
    recommendations: Song[];
    playingSongId: string | null;
    handlePreview: (song: Song) => void;
};

export default function RecommendationCarousel({
                                                   recommendations,
                                                   playingSongId,
                                                   handlePreview,
                                               }: Props) {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "center",
        dragFree: true,
        loop: true,
    });

    function scrollPrev() {
        emblaApi?.scrollPrev();
    }

    function scrollNext() {
        emblaApi?.scrollNext();
    }

    return (
        <div className="mx-auto flex w-full max-w-[1700px] items-center gap-4">

            <button
                onClick={scrollPrev}
                className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-[#6366F1]/80
                    to-[#EC4899]/80
                    backdrop-blur-xl
                    shadow-lg
                    transition-all
                    duration-200
                    hover:scale-110
                "
            >
                <ChevronLeft className="h-7 w-7 text-white" />
            </button>

            <div
                className="flex-1 overflow-hidden"
                ref={emblaRef}
            >
                <div className="flex gap-6 py-2 px-6">

                    {recommendations.map((song) => (
                        <div
                            key={song.id}
                            className="
                                w-52
                                shrink-0
                                rounded-2xl
                                overflow-hidden
                                bg-white/5
                                backdrop-blur-md
                                border
                                border-white/10
                                shadow-lg
                            "
                        >
                            {song.artwork ? (
                                <img
                                    src={song.artwork}
                                    alt={song.title}
                                    className="w-full aspect-square object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-square bg-white/10" />
                            )}

                            <div className="p-4">
                                <h3 className="font-semibold truncate">
                                    {song.title}
                                </h3>

                                <p className="text-sm text-gray-300 truncate">
                                    {song.artist.split(";").join(", ")}
                                </p>
                            </div>

                            <div className="mt-1 flex justify-center">
                                {song.preview ? (
                                    <div className="mb-4">
                                        <button
                                            onClick={() => handlePreview(song)}
                                            className="
                                                flex
                                                h-14
                                                w-24
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-white/10
                                                text-white
                                                transition-all
                                                hover:scale-105
                                            "
                                        >
                                            {playingSongId === song.id ? (
                                                <Pause className="h-6 w-6 fill-white" />
                                            ) : (
                                                <Play className="ml-1 h-6 w-6 fill-white" />
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mb-4 mt-1.5 flex justify-center">
                                        <button
                                            disabled
                                            className="
                                                rounded-lg
                                                bg-white/10
                                                px-4
                                                py-3
                                                text-gray-400
                                                cursor-not-allowed
                                            "
                                        >
                                            Preview Unavailable
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <button
                onClick={scrollNext}
                className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-[#6366F1]/80
                    to-[#EC4899]/80
                    backdrop-blur-xl
                    shadow-lg
                    transition-all
                    duration-200
                    hover:scale-110
                "
            >
                <ChevronRight className="h-7 w-7 text-white" />
            </button>

        </div>
    );
}