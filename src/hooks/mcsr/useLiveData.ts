import useSWR from "swr";
import type { ApiResponse } from "@/types/mcsr/LiveDataResponse";

// einfacher Fetcher für dein Backend
const fetcher = (url: string) =>
    fetch(url, { cache: "no-store" }).then((res) => {
        if (!res.ok) throw new Error(`API Error ${res.status}`);
        return res.json();
    });

export function useLiveData() {
    const { data, error, isLoading } = useSWR<ApiResponse>(
        "http://localhost:3001/live", // feste URL zum Backend
        fetcher,
        {
            refreshInterval: 5000,     // optional, kannst du rauslassen,
            revalidateOnFocus: true,   // wenn du nur Backend-Daten nimmst
        }
    );

    return {
        data,
        error,
        isLoading,
    };
}
