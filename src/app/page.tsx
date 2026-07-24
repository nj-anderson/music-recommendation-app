import Aurora from "@/components/Aurora";
import SongSearch from "@/components/SongSearch";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#0B0814] text-white">

            {/*aurora background*/}
            <div className="fixed inset-0 z-0">
                <Aurora
                    colorStops={[
                        "#6366F1",
                        "#EC4899",
                        "#6366F1",
                    ]}
                    amplitude={0.5}
                    blend={0.3}
                />
            </div>

            {/*title*/}
            <div className="relative z-10 pt-30">
                <h1 className="text-6xl font-bold text-center ">
                    Music Discovery
                </h1>
                <h2 className=" text-2xl text-center mt-5">
                    Discover new music through accurate our song recommendation algorithm.
                </h2>
            </div>

            {/*search tool*/}
            <div className="relative z-10 mt-10">
                <SongSearch />
            </div>

        </main>
    );
}