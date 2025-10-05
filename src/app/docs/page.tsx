"use client";

import { useState, type FC } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface LinkItem {
    label: string;
    url: string;
}

const links: LinkItem[] = [
    { label: "Konfiguration", url: "http://45.93.249.131:3002/config/home" },
    { label: "Leaderboard", url: "http://45.93.249.131:3002/OBS/quals/leaderboard?page=1" },
    { label: "Multitwitch", url: "http://45.93.249.131:3002/OBS/multitwitch" },
    { label: "Pause", url: "http://45.93.249.131:3002/OBS/pause" },
    { label: "Anzahl Completions", url: "http://45.93.249.131:3001/completions-length" },
    { label: "Aktuelle Runde", url: "http://45.93.249.131:3002/api/activeround" },
];

const Home: FC = () => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (url: string, index: number): Promise<void> => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (error) {
            console.error("Clipboard copy failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-xl w-full bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-slate-700">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Dach Playoffs Pages
                </h1>

                <div className="flex flex-col gap-4">
                    {links.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3 border border-slate-600 hover:border-slate-400 transition"
                        >
                            <div className="flex flex-col">
                                <span className="text-slate-200 font-semibold">{item.label}</span>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 text-sm truncate hover:text-slate-200 transition"
                                >
                                    {item.url}
                                </a>
                            </div>

                            <button
                                onClick={() => handleCopy(item.url, index)}
                                className="ml-3 p-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition flex items-center justify-center"
                                aria-label={`Copy ${item.label} URL`}
                            >
                                {copiedIndex === index ? (
                                    <FaCheck className="text-green-400" />
                                ) : (
                                    <FaCopy />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;