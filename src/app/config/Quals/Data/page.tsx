"use client";

import Layout from "@/components/layout";
import { useLiveData } from "@/hooks/mcsr/useLiveData";
import type { Player, Timeline, Completion } from "@/types/mcsr/LiveDataResponse";
import { setValue } from "@/utils/database/interact";

export default function LivePage() {
    const { data, error, isLoading } = useLiveData();

    // === KONFIGURATION DER STAGES ===
    const STAGE_MAP: Record<string, string> = {
        "story.enter_the_nether": "Entered Nether",
        "nether.find_bastion": "Entered Bastion",
        "nether.find_fortress": "Entered Fortress",
        "projectelo.timeline.blind_travel": "Finding Stronghold",
        "story.follow_ender_eye": "Found Stronghold",
        "story.enter_the_end": "Entered End",
    };

    const STAGE_ORDER = [
        "Started Match",
        "Entered Nether",
        "Entered Bastion",
        "Entered Fortress",
        "Finding Stronghold",
        "Found Stronghold",
        "Entered End",
        "Completed Match",
    ];

    const DEFAULT_STAGE = "Started Match";
    const COMPLETED_STAGE = "Completed Match";

    // === LADESTATUS ===
    if (isLoading) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout>
                <p>Fehler beim Laden: {error.message}</p>
            </Layout>
        );
    }
    if (!data) {
        return (
            <Layout>
                <p>Keine Daten gefunden</p>
            </Layout>
        );
    }

    // === HILFSFUNKTIONEN ===
    const formatTime = (ms: number): string => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const completedUuids = new Set(
        data.data.completions.map((c: Completion) => c.uuid)
    );

    const insertCompletions = (idx: number) => {
        const completedPlayers = data.data.players.filter((p) =>
            completedUuids.has(p.uuid)
        );
        for (let x = 0; x < 16; x++) {
            if (x < completedPlayers.length) {
                setValue(
                    `quals-seed${idx}-${x + 1}`,
                    completedPlayers[x].nickname
                );
            }
        }
    };

    // === STAGE + ZEIT ERMITTELN ===
    const getStageInfo = (uuid: string): { label: string; time: number | null } => {
        if (completedUuids.has(uuid)) {
            const completion = data.data.completions.find(
                (c: Completion) => c.uuid === uuid
            );
            return { label: COMPLETED_STAGE, time: completion?.time ?? null };
        }

        const playerActions = data.data.timelines?.filter(
            (a) => a.uuid === uuid
        ) ?? [];

        let latestStage = DEFAULT_STAGE;
        let latestTime: number | null = null;

        for (const [event, label] of Object.entries(STAGE_MAP)) {
            const matches = playerActions.filter((a) => a.type === event);
            if (matches.length > 0) {
                const newest = matches.sort((a, b) => b.time - a.time)[0];
                if (!latestTime || newest.time > latestTime) {
                    latestStage = label;
                    latestTime = newest.time;
                }
            }
        }

        return { label: latestStage, time: latestTime };
    };

    // === LETZTEN PROGRESS (inkl. COMPLETION) ===
    const getLastProgress = (
        uuid: string
    ): { type: string; time: number | null } | null => {
        if (completedUuids.has(uuid)) {
            const completion = data.data.completions.find(
                (c: Completion) => c.uuid === uuid
            );
            return {
                type: COMPLETED_STAGE,
                time: completion?.time ?? null,
            };
        }

        const timelines = data.data.timelines.filter((t) => t.uuid === uuid);
        if (timelines.length === 0) return null;
        const last = timelines.sort((a, b) => b.time - a.time)[0];
        return { type: last.type, time: last.time };
    };

    // === SORTIERUNG NACH FORTSCHRITT ===
    const sortPlayersByProgress = (players: Player[]): Player[] => {
        return [...players].sort((a, b) => {
            const aStage = getStageInfo(a.uuid);
            const bStage = getStageInfo(b.uuid);
            const aIndex = STAGE_ORDER.indexOf(aStage.label);
            const bIndex = STAGE_ORDER.indexOf(bStage.label);

            if (aIndex === bIndex) {
                if (aStage.time && bStage.time) return aStage.time - bStage.time;
                return 0;
            }
            return bIndex - aIndex;
        });
    };

    const sortedPlayers = sortPlayersByProgress(data.data.players);

    // === UI ===
    return (
        <Layout>
            <h1 className="text-xl font-bold mb-4">Spieler Fortschritt</h1>

            <p className="mb-4">
                <span className="font-semibold">Status:</span>{" "}
                <span className="uppercase">{data.data.status}</span>
            </p>

            <table className="min-w-full border border-gray-600">
                <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2 text-left">Spieler</th>
                    <th className="px-4 py-2 text-left">Split</th>
                    <th className="px-4 py-2 text-left">Letzter Progress</th>
                    <th className="px-4 py-2 text-left">Zeit</th>
                </tr>
                </thead>
                <tbody>
                {sortedPlayers.map((player: Player) => {
                    const stageInfo = getStageInfo(player.uuid);
                    const last = getLastProgress(player.uuid);
                    const isCompleted = completedUuids.has(player.uuid);

                    return (
                        <tr
                            key={player.uuid}
                            className={`border-t border-gray-600 ${
                                isCompleted ? "bg-green-800 text-white" : ""
                            }`}
                        >
                            <td className="px-4 py-2">{player.nickname}</td>
                            <td className="px-4 py-2">
                                {stageInfo.label}
                                {stageInfo.time && (
                                    <span className="text-gray-400">
                                            {" "}
                                        ({formatTime(stageInfo.time)})
                                        </span>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {last?.type ?? "-"}
                            </td>
                            <td className="px-4 py-2">
                                {last?.time ? formatTime(last.time) : "-"}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="flex flex-wrap gap-2 p-2 mt-4">
                {[...Array(10)].map((_, i) => (
                    <button
                        key={i}
                        className="bg-blue-400 rounded-md p-1 px-3 hover:bg-blue-300"
                        onClick={() => insertCompletions(i + 1)}
                    >
                        Daten Speichern für Seed {i + 1}
                    </button>
                ))}
            </div>
        </Layout>
    );
}
