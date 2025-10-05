"use client";

import { useState } from "react";

export default function HomePage() {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [result, setResult] = useState<any>(null);

    // GET Value
    async function fetchValue() {
        if (!key) return;
        const res = await fetch(`/api/database/getData/?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        setResult(data);
        if (data.value) setValue(data.value);
    }

    // POST Value
    async function saveValue() {
        if (!key) return;
        const res = await fetch("/api/database/getData/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, value }),
        });
        const data = await res.json();
        setResult(data);
    }

    return (
        <main className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-2xl font-bold">Config Key/Value Demo</h1>

            <div className="flex gap-2">
                <input
                    className="border rounded px-2 py-1"
                    placeholder="Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <button
                    onClick={fetchValue}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Load
                </button>
            </div>

            <div className="flex gap-2">
                <input
                    className="border rounded px-2 py-1"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    onClick={saveValue}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Save
                </button>
            </div>

            {result && (
                <pre className="bg-gray-100 p-4 rounded w-full max-w-md">
          {JSON.stringify(result, null, 2)}
        </pre>
            )}
        </main>
    );
}
