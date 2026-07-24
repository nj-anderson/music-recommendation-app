type Props = {
    label: string;
    value: number;
};

export default function Stat({ label, value }: Props) {

    const percent = Math.round(value * 100);

    return (
        <div>

            <div className="flex justify-between mb-1">

                <span>{label}</span>

                <span>{percent}%</span>

            </div>

            <div className="h-3 rounded-full bg-white/10">

                <div
                    className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#6366F1]
                    to-[#EC4899]
                    shadow-[0_0_10px_rgba(236,72,153,0.35)]
                    transition-all
                    duration-500
                "
                    style={{
                        width: `${percent}%`,
                    }}
                />

            </div>

        </div>
    );
}