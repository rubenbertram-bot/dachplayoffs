"use client";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { getValue, setValue } from "@/utils/database/interact";

export default function ConfigPage() {
    const [data, setData] = useState<Record<string, string>>({});
    const [loaded, setLoaded] = useState<number>(0);

    // Seeds gruppieren (10 Gruppen à 16)
    const seedGroups: string[][] = [];
    for (let s = 1; s <= 10; s++) {
        const group: string[] = [];
        for (let c = 1; c <= 16; c++) {
            group.push(`quals-seed${s}-${c}`);
        }
        seedGroups.push(group);
    }

    const loadData = async () => {
        setLoaded(0);
        const results: Record<string, string> = {};
        for (const group of seedGroups) {
            for (const key of group) {
                const value = await getValue(key);
                results[key] = value;
                setLoaded((prev) => prev + 1);
            }
        }
        setData(results);
    };

    const handleSave = async (key: string) => {
        const value = data[key];
        await setValue(key, value);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Layout>
            <div className="mb-4 flex items-center">
                <span className="mr-2 font-mono text-sm">
                    Loading {loaded}/160
                </span>
                <button
                    onClick={loadData}
                    className="bg-blue-400 hover:bg-blue-300 text-black font-semibold p-1 px-4 rounded-md"
                >
                    Reload
                </button>
            </div>

            {/* 10 Gruppen, jeweils mit Abstand */}
            <div className="space-y-10">
                {seedGroups.map((group, index) => (
                    <div key={index}>
                        {/* Seed-Titel */}
                        <h2 className="text-lg font-bold mb-3 text-gray-800">
                            Seed {index + 1}
                        </h2>

                        {/* Inputs im Grid */}
                        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                            {group.map((key, i) => (
                                <div
                                    key={key}
                                    className="flex items-center space-x-2 border-b border-gray-200 pb-1"
                                >
                                    {/* Platzierungs-Label 1.–16. */}
                                    <label className="w-6 font-mono text-sm text-gray-700 text-right">
                                        {i + 1}.
                                    </label>
                                    <input
                                        type="text"
                                        value={data[key] || ""}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [key]: e.target.value,
                                            }))
                                        }
                                        className="border border-gray-400 rounded px-2 py-1 flex-1 text-sm"
                                    />
                                    <button
                                        onClick={() => handleSave(key)}
                                        className="bg-green-400 hover:bg-green-300 text-black font-semibold px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
