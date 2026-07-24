import type { Song } from "@/types/song";
import Stat from "@/components/Stat";

type Props = {
    song: Song;
};

export default function SongProfile({ song }: Props) {
    return (
        <div className="mb-12 flex justify-center">
            <div
                className="
                    max-w-4xl
                    rounded-3xl
                    bg-white/5
                    backdrop-blur-xl
                    border border-white/10
                    p-8
                    shadow-2xl
                "
            >
                {/* Top section */}
                <div className="flex gap-8">

                    <img
                        src={song.artwork ?? undefined}
                        alt={song.title}
                        className="w-72 h-72 rounded-2xl object-cover"
                    />

                    <div className="flex flex-col flex-1">

                        <div>
                            <h1 className="text-4xl font-bold">
                                {song.title}
                            </h1>

                            <p className="text-xl text-gray-300 mt-2">
                                {song.artist.split(";").join(", ")}
                            </p>
                        </div>

                        <div className="space-y-5 mt-8">
                            <Stat
                                label="Energy"
                                value={song.energy}
                            />

                            <Stat
                                label="Danceability"
                                value={song.danceability}
                            />

                            <Stat
                                label="Happiness"
                                value={song.valence}
                            />
                        </div>

                        <div className="mt-8 space-y-2 text-lg">
                            <p>
                                <span className="font-semibold">
                                    BPM:
                                </span>{" "}
                                {Math.round(song.bpm)}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Key:
                                </span>{" "}
                                {song.key}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Button */}
                <div className="mt-10 flex justify-center">
                    <div
                        className="
                            w-96
                            rounded-xl
                            bg-gradient-to-r
                            from-[#6366F1]
                            to-[#EC4899]
                            p-[2px]
                        "
                    >
                        <button
                            className="
                                w-full
                                rounded-[10px]
                                bg-[#2A2438]
                                py-3
                                text-lg
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-[#3e3547]
                            "
                        >
                            ✨ Generate Recommendations
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}