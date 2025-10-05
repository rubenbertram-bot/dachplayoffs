"use client";

import { useState, useEffect } from "react";
import { Nametag } from "@/components/multitwitch/nametag";
import TwitchPlayer from "@/components/multitwitch/player";
import { Preview } from "@/components/multitwitch/preview";
import { FaYoutube, FaTwitch } from "react-icons/fa";

interface Player {
    twitch: string;
    ign: string;
    type: string; // "0" = Twitch, "1" = YouTube
    alias: string;
}

declare global {
    interface Window {
        Twitch: any;
    }
}

export default function Home() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [twitchInput, setTwitchInput] = useState("");
    const [aliasInput, setAliasInput] = useState("");
    const [ignInput, setIgnInput] = useState("");
    const [active, setActive] = useState<number[]>([-1, -1, -1, -1]);
    const [streamType, setStreamType] = useState<0 | 1>(0);

    // --- Twitch SDK laden ---
    useEffect(() => {
        if (!window.Twitch) {
            const script = document.createElement("script");
            script.src = "https://player.twitch.tv/js/embed/v1.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // --- Spieler aus URL laden ---
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const playersParam = params.get("players");
        const initialPlayers: Player[] = playersParam
            ? playersParam
                .split(",")
                .map((p) => {
                    const [twitch, alias, type, ign] = p
                        .split(":")
                        .map(decodeURIComponent);
                    return {
                        twitch: twitch || "",
                        alias: alias || "",
                        type: type || "0",
                        ign: ign || "",
                    };
                })
                .filter((p) => p.twitch && p.alias)
            : [];

        setPlayers(initialPlayers);

        const activeParam = params.get("active");
        let initialActive = Array(4).fill(-1);
        if (activeParam) {
            const parts = activeParam.split(",").map(Number);
            parts.forEach((val, idx) => {
                if (idx < 4) initialActive[idx] = val;
            });
        } else {
            initialActive = initialPlayers.slice(0, 4).map((_, idx) => idx);
            while (initialActive.length < 4) initialActive.push(-1);
        }
        setActive([-1, -1, -1, -1]);
        setTimeout(() => setActive(initialActive), 200);
    }, []);

    // --- Spieler in URL speichern ---
    useEffect(() => {
        const params = new URLSearchParams();

        if (players.length > 0) {
            params.set(
                "players",
                players
                    .map(
                        (p) =>
                            `${encodeURIComponent(p.twitch)}:${encodeURIComponent(
                                p.alias
                            )}:${encodeURIComponent(p.type)}:${encodeURIComponent(p.ign)}`
                    )
                    .join(",")
            );
        }

        params.set("active", active.join(","));
        window.history.replaceState(null, "", `?${params}`);
    }, [players, active]);

    // --- Player Layout ---
    const applyPlayerLayout = () => {
        const playerElements = document.querySelectorAll(".player");

        playerElements.forEach((el) => {
            (el as HTMLElement).style.display = "none";
        });

        active.forEach((playerIdx, screenIdx) => {
            if (playerIdx === -1 || playerIdx >= players.length) return;
            const el = playerElements[playerIdx] as HTMLElement;
            if (!el) return;

            switch (screenIdx) {
                case 0:
                    el.style.cssText =
                        "display:inline; width:66.6666%; height:66.6666%; margin-left:0%; top:0%;";
                    break;
                case 1:
                    el.style.cssText =
                        "display:inline; width:33.3333%; height:33.3333%; margin-left:66.6666%; top:0%;";
                    break;
                case 2:
                    el.style.cssText =
                        "display:inline; width:33.3333%; height:33.3333%; margin-left:66.6666%; top:33.3333%;";
                    break;
                case 3:
                    el.style.cssText =
                        "display:inline; width:33.3333%; height:33.3333%; margin-left:66.6666%; top:66.6666%;";
                    break;
            }
        });
    };

    useEffect(() => {
        applyPlayerLayout();
    }, [active, players]);

    // --- Player hinzufügen ---
    const addPlayer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!twitchInput || !aliasInput) return;
        setPlayers((prev) => [
            ...prev,
            {
                twitch: twitchInput,
                ign: ignInput,
                type: String(streamType),
                alias: aliasInput,
            },
        ]);
        setTwitchInput("");
        setAliasInput("");
        setIgnInput("");
    };

    // --- Swap + Delete ---
    const swap = (playerIdx: number, screenPos: number) => {
        setActive((prev) => {
            const newActive = [...prev];
            const currentPos = newActive.indexOf(playerIdx);
            if (currentPos !== -1) {
                [newActive[screenPos], newActive[currentPos]] = [
                    newActive[currentPos],
                    newActive[screenPos],
                ];
            } else {
                newActive[screenPos] = playerIdx;
            }
            return newActive;
        });
    };

    const deletePlayer = (index: number) => {
        setPlayers((prevPlayers) => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers.splice(index, 1);
            return updatedPlayers;
        });
    };

    // --- Render ---
    return (
        <div className="overflow-hidden w-screen h-screen">
            {players.map((player, index) => (
                <TwitchPlayer
                    channel={player.twitch}
                    parent={["obs.dach-playoffs.de"]}
                    id={`player-${index}`}
                    type={player.type === "0" ? "twitch" : "youtube"}
                    key={player.alias + player.twitch}
                />
            ))}

            {/* Nametags */}
            <div className="absolute">
                <Nametag name={players[active[0]]?.alias || ""} ign={players[active[0]]?.ign || ""} />
            </div>
            <div className="absolute left-[66.6666%]">
                <Nametag name={players[active[1]]?.alias || ""}  ign={players[active[1]]?.ign || ""} />
            </div>
            <div className="absolute left-[66.6666%] top-[33.3333%]">
                <Nametag name={players[active[2]]?.alias || ""} ign={players[active[2]]?.ign || ""}  />
            </div>
            <div className="absolute left-[66.6666%] top-[66.6666%]">
                <Nametag name={players[active[3]]?.alias || ""}  ign={players[active[3]]?.ign || ""} />
            </div>

            {/* Control Panel */}
            <div className="w-[66.66%] absolute bottom-0 h-[33.3333%] bg-neutral-200 p-4">
                <form
                    onSubmit={addPlayer}
                    className="mb-4 bg-neutral-400 w-fit p-1 rounded-md flex gap-2 items-center"
                >
                    <input
                        type="text"
                        placeholder="Channel"
                        value={twitchInput}
                        onChange={(e) => setTwitchInput(e.target.value)}
                        className="p-1"
                    />
                    <input
                        type="text"
                        placeholder="IGN"
                        value={ignInput}
                        onChange={(e) => setIgnInput(e.target.value)}
                        className="p-1"
                    />
                    <input
                        type="text"
                        placeholder="Alias"
                        value={aliasInput}
                        onChange={(e) => setAliasInput(e.target.value)}
                        className="p-1"
                    />

                    <button
                        type="button"
                        className={`p-1 rounded ${
                            streamType === 0
                                ? "bg-yellow-400 text-black"
                                : "bg-neutral-500 text-white hover:bg-neutral-300"
                        }`}
                        onClick={() => setStreamType(0)}
                    >
                        <FaTwitch />
                    </button>
                    <button
                        type="button"
                        className={`p-1 rounded ${
                            streamType === 1
                                ? "bg-yellow-400 text-black"
                                : "bg-neutral-500 text-white hover:bg-neutral-300"
                        }`}
                        onClick={() => setStreamType(1)}
                    >
                        <FaYoutube />
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-400 transition-all text-white p-1 rounded"
                    >
                        Add Player
                    </button>
                </form>

                <div className="grid grid-cols-9 grid-rows-4 gap-2">
                    {players.map((player, idx) => (
                        <Preview
                            key={player.twitch + player.alias}
                            alias={player.alias}
                            index={idx}
                            active={active}
                            swap={swap}
                            deleteFunc={deletePlayer}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
