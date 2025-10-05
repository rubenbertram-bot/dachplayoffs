"use client";

import { useEffect, useState } from "react";
import { getValue } from "@/utils/database/interact";
import { FaGripLines } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export default function Home() {
    const [leaderboard, setLeaderboard] = useState<string[][]>([]);
    const [players, setPlayers] = useState<any[]>([]);
    const [nickMap, setNickMap] = useState<Record<string, string>>({});
    const [page, setPage] = useState<number>(1);

    const pointsMap = [18, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    useEffect(() => {
        const updatePageFromURL = () => {
            const params = new URLSearchParams(window.location.search);
            const pageParam = parseInt(params.get("page") || "1", 10);
            setPage(isNaN(pageParam) ? 1 : pageParam);
        };
        updatePageFromURL();
        window.addEventListener("popstate", updatePageFromURL);
        return () => window.removeEventListener("popstate", updatePageFromURL);
    }, []);

    useEffect(() => {
        const loadNicks = async () => {
            const nickKeys = Array.from({ length: 50 }, (_, i) => `Nick-${i}`);
            const values = await Promise.all(nickKeys.map(k => getValue(k)));
            const map: Record<string, string> = {};
            values.forEach(val => {
                if (!val) return;
                const [ign, nick] = val.split("|");
                if (ign && nick) map[ign] = nick;
            });
            setNickMap(map);
        };
        loadNicks();
    }, []);

    useEffect(() => {
        const keys = Array.from({ length: 10 * 16 }, (_, i) => {
            const s = Math.floor(i / 16) + 1;
            const c = (i % 16) + 1;
            return `quals-seed${s}-${c}`;
        });
        const loadData = async () => {
            const values = await Promise.all(keys.map(k => getValue(k)));
            const array: string[][] = [];
            for (let x = 0; x < 10; x++) {
                const temp: string[] = [];
                for (let y = 0; y < 16; y++) {
                    temp.push(values[x * 16 + y]);
                }
                array.push(temp);
            }
            setLeaderboard(array);
        };
        loadData();
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (leaderboard.length === 0) return;
        const scores: Record<string, { total: number; perSeed: number[] }> = {};
        leaderboard.forEach((seed, seedIndex) => {
            seed.forEach((player, pos) => {
                if (!player) return;
                const pts = pointsMap[pos] ?? 0;
                if (!scores[player]) scores[player] = { total: 0, perSeed: Array(10).fill(0) };
                scores[player].total += pts;
                scores[player].perSeed[seedIndex] = pts;
            });
        });
        const lastSeedIndex = leaderboard.map(seed => seed.some(p => !!p)).lastIndexOf(true);
        const computeRanking = (ignoreLast = false) => {
            const entries = Object.entries(scores).map(([ign, data]) => {
                const points = ignoreLast
                    ? data.perSeed.reduce((acc, p, i) => (i === lastSeedIndex ? acc : acc + p), 0)
                    : data.perSeed.reduce((acc, p) => acc + p, 0);
                const last = data.perSeed[lastSeedIndex] || 0;
                return { ign, total: points, last };
            });
            return entries.filter(p => p.total > 0).sort((a, b) => b.total - a.total);
        };
        const fullRanking = computeRanking(false);
        const withoutLastRanking = computeRanking(true);
        const playerData = fullRanking.slice(0, 18 * page).map((player, i) => {
            const currentRank = i + 1;
            const oldRank = withoutLastRanking.findIndex(p => p.ign === player.ign);
            const trend = oldRank === -1 ? 0 : oldRank + 1 - currentRank;
            return {
                name: nickMap[player.ign] ?? player.ign,
                ign: player.ign,
                total: player.total,
                last: player.last,
                trend
            };
        });
        setPlayers(playerData);
    }, [leaderboard, nickMap, page]);

    return (
        <div>
            <img src={"/Leaderboard.png"} alt={""} className="absolute z-[-10]" />
            <div className="absolute top-2 left-2 text-white text-3xl font-bold" style={{ fontFamily: "Playoffs" }} >PAGE {page}</div>
            {Array.from({ length: 9 }, (_, i) => (
                <div key={i} style={{ position: "absolute", top: 308 + i * 79, left: 116 }} className="flex flex-col gap-4">
                    <Element index={i + (page - 1) * 18} players={players} />
                </div>
            ))}
            {Array.from({ length: 9 }, (_, i) => (
                <div key={i + 9} style={{ position: "absolute", top: 308 + i * 79, left: 968 }} className="flex flex-col gap-4">
                    <Element index={i + 9 + (page - 1) * 18} players={players} />
                </div>
            ))}
        </div>
    );
}

interface ElementProps {
    index: number;
    players: any[];
}

const Element: React.FC<ElementProps> = ({ index, players }) => {
    "use client";
    const player = players[index];
    if (!player) return null;
    const { ign, name, trend, last, total } = player;
    const renderTrend = () => {
        if (trend > 0)
            return (
                <span className="text-green-500 w-[87px] flex items-center justify-center text-6xl pr-1">
                    <IoMdArrowDropup />
                </span>
            );
        if (trend < 0)
            return (
                <span className="text-red-500 w-[87px] flex items-center justify-center text-6xl pr-1">
                    <IoMdArrowDropdown />
                </span>
            );
        return (
            <span className="text-gray-500 w-[87px] flex items-center justify-center text-4xl">
                <FaGripLines />
            </span>
        );
    };
    return (
        <div className="flex justify-between w-[838px]">
            <img src={`https://mc-heads.net/avatar/${ign}/69`} alt={ign} className="m-[4px]" />
            <div className="flex w-full">
                <span style={{ fontFamily: "Playoffs" }} className="text-white text-3xl w-[500px] flex items-center pl-4 pb-2 pr-1">
                    {name.toUpperCase()}
                </span>
                <div className="flex justify-between w-[260px]">
                    {renderTrend()}
                    <span style={{ fontFamily: "Playoffs" }} className="text-white text-2xl w-[86px] flex items-center justify-center pb-2 pr-1">
                        {last}
                    </span>
                    <span style={{ fontFamily: "Playoffs" }} className="text-white text-2xl w-[87px] flex items-center justify-center pb-2 pr-1">
                        {total}
                    </span>
                </div>
            </div>
        </div>
    );
};
