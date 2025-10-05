"use client";
import { useEffect, useState } from "react";

interface StingerProps {
    scene: string; // kommt extern: "0" oder "1"
}

export const Stinger: React.FC<StingerProps> = ({ scene }) => {
    const [frame, setFrame] = useState<number | null>(null);

    // Frame-Pfade: 00000000.png bis 00000037.png
    const frames = Array.from({ length: 41 }, (_, i) =>
        `/stinger/${i.toString().padStart(8, "0")}.png`
    );

    useEffect(() => {
        // bei jedem Scene-Change neu starten
        setFrame(0);

        let index = 0;
        const interval = setInterval(() => {
            index++;
            if (index >= frames.length) {
                setFrame(null); // Animation fertig → Overlay aus
                clearInterval(interval);
            } else {
                setFrame(index);
            }
        }, 1000 / 24); // 24 fps

        return () => clearInterval(interval);
    }, [scene]); // läuft bei jedem Wechsel 0⇄1

    if (frame === null) return null;

    return (
        <div className="flex items-center justify-center pointer-events-none ">
            <img
                src={frames[frame]}
                className="w-full h-full object-contain"
                alt={`Stinger Frame ${frame}`}
            />
        </div>
    );
};
