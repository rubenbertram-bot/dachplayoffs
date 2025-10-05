// File: /app/api/next-seed/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
    try {
        // MySQL-Verbindung herstellen
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        // Alle 10 Seeds prüfen
        for (let x = 1; x <= 10; x++) {
            const key = `quals-seed${x}-1`;
            const [rows] = await conn.execute(
                "SELECT `value` FROM config WHERE `key` = ? LIMIT 1",
                [key]
            );

            // Wenn leer oder nicht vorhanden → Rückgabe dieser Seednummer
            if (
                !Array.isArray(rows) ||
                rows.length === 0 ||
                (rows[0] as any).value === null ||
                (rows[0] as any).value === ""
            ) {
                await conn.end();
                return new Response(x.toString(), {
                    status: 200,
                    headers: { "Content-Type": "text/plain" },
                });
            }
        }

        await conn.end();

        return new Response("0", {
            status: 200,
            headers: { "Content-Type": "text/plain" },
        });
    } catch (err: any) {
        console.error("Error fetching seed values:", err);
        return new Response("error", {
            status: 500,
            headers: { "Content-Type": "text/plain" },
        });
    }
}
