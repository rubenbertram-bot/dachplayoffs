export const getValue = async (key: string) => {
    const res = await fetch(`/api/database/getData?key=${encodeURIComponent(key)}`);
    const data = await res.json();
    return await data.value;
}

export const setValue = async (key: string, value: string) => {
    const res = await fetch("/api/database/getData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
    });
}