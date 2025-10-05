"use client";

import { useState, useEffect } from "react";
import { FaGripLines } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export default function Home() {
    const [players, setPlayers] = useState<any[]>([]);

    // --- statische NickMap ---
    const nickMap: Record<string, string> = {
        doogile: "doog",
        infume: "InfumeYT",
        Couriway: "Couri",
        Fulham0234: "Fulham",
        hackingnoises: "hax",
        Allofme: "eddy",
    };

    // --- statisches Leaderboard (10 Seeds mit max. 16 Spielern) ---
    // --- statisches Leaderboard (10 Seeds, 10–16 Spieler, 32 Spieler gesamt) ---
    // --- statisches Leaderboard (10 Seeds, 10–16 Spieler, alle 32 Spieler min. 1x) ---
    const staticLeaderboard: string[][] = [
        // Seed 1
        ["doogile", "Allofme", "retropog", "Bloonskiller", "hackingnoises", "ulsah1n", "BlazeMind", "MrBudgiee", "webwormy", "dinonuggieboi", "Maraico_"],
        // Seed 2
        ["okrzej_", "tucrack", "SuperC_", "JoomzMonkey", "nEmerald", "Ancoboyy", "yjako", "steez", "lowk3y_", "BlazeMind", "retropog", "Bloonskiller"],
        // Seed 3
        ["hackingnoises", "ulsah1n", "Maraico_", "MrBudgiee", "webwormy", "dinonuggieboi", "okrzej_", "tucrack", "SuperC_", "JoomzMonkey", "nEmerald", "Ancoboyy"],
        // Seed 4
        ["doogile", "yjako", "lowk3y_", "Allofme", "retropog", "Bloonskiller", "BlazeMind", "hackingnoises", "ulsah1n", "Maraico_", "MrBudgiee"],
        // Seed 5
        ["doogile", "dinonuggieboi", "okrzej_", "tucrack", "SuperC_", "JoomzMonkey", "nEmerald", "Ancoboyy", "yjako", "steez", "lowk3y_", "BlazeMind", "Allofme"],
        // Seed 6
        ["doogile", "Bloonskiller", "hackingnoises", "ulsah1n", "Maraico_", "MrBudgiee", "webwormy", "dinonuggieboi", "okrzej_", "tucrack", "SuperC_", "JoomzMonkey"],
        // Seed 7
        ["doogile", "Ancoboyy", "yjako", "steez", "lowk3y_", "Allofme", "retropog", "Bloonskiller", "BlazeMind", "hackingnoises", "ulsah1n"],
        // Seed 8
        ["Maraico_", "MrBudgiee", "webwormy", "dinonuggieboi", "okrzej_", "tucrack", "SuperC_", "JoomzMonkey", "nEmerald", "Ancoboyy", "yjako", "steez"],
        // Seed 9
        ["lowk3y_", "Allofme", "retropog", "Bloonskiller", "BlazeMind", "hackingnoises", "ulsah1n", "Maraico_", "MrBudgiee", "webwormy", "dinonuggieboi"],
        // Seed 10
        ["okrzej_", "tucrack", "SuperC_", "JoomzMonkey", "nEmerald", "Ancoboyy", "yjako", "steez", "lowk3y_", "Allofme", "retropog", "Bloonskiller", "BlazeMind"],
    ];


    const pointsMap = [18, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    useEffect(() => {
        const scores: Record<string, { total: number; perSeed: number[] }> = {};

        staticLeaderboard.forEach((seed, seedIndex) => {
            seed.forEach((player, pos) => {
                if (!player) return;
                const pts = pointsMap[pos] ?? 0;
                if (!scores[player]) {
                    scores[player] = { total: 0, perSeed: Array(10).fill(0) };
                }
                scores[player].total += pts;
                scores[player].perSeed[seedIndex] = pts;
            });
        });

        const lastSeedIndex = staticLeaderboard
            .map(seed => seed.some(p => !!p))
            .lastIndexOf(true);

        const computeRanking = (ignoreLast = false) => {
            const entries = Object.entries(scores).map(([ign, data]) => {
                const points = ignoreLast
                    ? data.perSeed.reduce(
                        (acc, p, i) => (i === lastSeedIndex ? acc : acc + p),
                        0
                    )
                    : data.perSeed.reduce((acc, p) => acc + p, 0);

                const last = data.perSeed[lastSeedIndex] || 0;

                return { ign, total: points, last };
            });

            return entries
                .filter(p => p.total > 0)
                .sort((a, b) => b.total - a.total);
        };

        const fullRanking = computeRanking(false);
        const withoutLastRanking = computeRanking(true);

        const playerData = fullRanking.slice(0, 18).map((player, i) => {
            const currentRank = i + 1;
            const oldRank = withoutLastRanking.findIndex(p => p.ign === player.ign);
            const trend = oldRank === -1 ? 0 : oldRank + 1 - currentRank;

            return {
                name: nickMap[player.ign] ?? player.ign, // Nickname fallback IGN
                ign: player.ign,
                total: player.total,
                last: player.last,
                trend,
            };
        });

        setPlayers(playerData);
    }, []);

    return (
        <div className="">
            <img src={"/Leaderboard.png"} alt={""} className="absolute z-[-10]" />

            <div className="absolute top-[308px] left-[116px] flex flex-col gap-4"><Element index={0} players={players} /></div>
            <div className="absolute top-[387px] left-[116px] flex flex-col gap-4"><Element index={1} players={players} /></div>
            <div className="absolute top-[466px] left-[116px] flex flex-col gap-4"><Element index={2} players={players} /></div>
            <div className="absolute top-[545px] left-[116px] flex flex-col gap-4"><Element index={3} players={players} /></div>
            <div className="absolute top-[624px] left-[116px] flex flex-col gap-4"><Element index={4} players={players} /></div>
            <div className="absolute top-[703px] left-[116px] flex flex-col gap-4"><Element index={5} players={players} /></div>
            <div className="absolute top-[782px] left-[116px] flex flex-col gap-4"><Element index={6} players={players} /></div>
            <div className="absolute top-[861px] left-[116px] flex flex-col gap-4"><Element index={7} players={players} /></div>
            <div className="absolute top-[940px] left-[116px] flex flex-col gap-4"><Element index={8} players={players} /></div>

            <div className="absolute top-[308px] left-[968px] flex flex-col gap-4"><Element index={9} players={players} /></div>
            <div className="absolute top-[387px] left-[968px] flex flex-col gap-4"><Element index={10} players={players} /></div>
            <div className="absolute top-[466px] left-[968px] flex flex-col gap-4"><Element index={11} players={players} /></div>
            <div className="absolute top-[545px] left-[968px] flex flex-col gap-4"><Element index={12} players={players} /></div>
            <div className="absolute top-[624px] left-[968px] flex flex-col gap-4"><Element index={13} players={players} /></div>
            <div className="absolute top-[703px] left-[968px] flex flex-col gap-4"><Element index={14} players={players} /></div>
            <div className="absolute top-[782px] left-[968px] flex flex-col gap-4"><Element index={15} players={players} /></div>
            <div className="absolute top-[861px] left-[968px] flex flex-col gap-4"><Element index={16} players={players} /></div>
            <div className="absolute top-[940px] left-[968px] flex flex-col gap-4"><Element index={17} players={players} /></div>
        </div>
    );
}

interface ElementProps {
    index: number;
    players: any[];
}

const Element: React.FC<ElementProps> = ({ index, players }) => {
    // Safe lookup
    const player = players[index];
    if (!player) {
        return null; // Rendert nichts, wenn Index nicht existiert
    }

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
            <span className="text-gray-500 w-[87px] flex items-center justify-center text-4xl ">
        <FaGripLines />
      </span>
        );
    };

    return (
        <div className="flex justify-between w-[838px]">
            <img src={`https://mc-heads.net/avatar/${ign}/69`} alt={ign} className="m-[4px]"/>
            <div className="flex w-full">
        <span
            style={{ fontFamily: "Playoffs" }}
            className="text-white text-3xl w-[500px] flex items-center pl-4 pb-2 pr-1"
        >
          {name.toUpperCase()}
        </span>
                <div className="flex justify-between w-[260px]">
                    {renderTrend()}
                    <span
                        style={{ fontFamily: "Playoffs" }}
                        className="text-white text-2xl w-[86px] flex items-center justify-center pb-2 pr-1"
                    >
            {last}
          </span>
                    <span
                        style={{ fontFamily: "Playoffs" }}
                        className="text-white text-2xl w-[87px] flex items-center justify-center pb-2 pr-1"
                    >
            {total}
          </span>
                </div>
            </div>
        </div>
    );
};
