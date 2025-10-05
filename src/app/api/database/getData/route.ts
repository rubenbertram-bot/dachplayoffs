import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// DB Connection Helper
async function getConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
}

// GET ?key=xyz → { key, value }
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const key = searchParams.get("key");

        if (!key) {
            return NextResponse.json({ error: "Missing key parameter" }, { status: 400 });
        }

        const conn = await getConnection();
        const [rows] = await conn.execute(
            "SELECT `key`, `value` FROM config WHERE `key` = ? LIMIT 1",
            [key]
        );
        await conn.end();

        if (Array.isArray(rows) && rows.length > 0) {
            return NextResponse.json(rows[0]);
        } else {
            return NextResponse.json({ error: "Key does not exist" }, { status: 404 });
        }
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "DB error", details: err.message }, { status: 500 });
    }
}

// POST body: { key: string, value: string }
// Setzt den Wert nur, wenn der Key existiert
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { key, value } = body;

        if (!key || value === undefined) {
            return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
        }

        const conn = await getConnection();

        // Prüfen, ob der Key existiert
        const [rows] = await conn.execute(
            "SELECT `value` FROM config WHERE `key` = ? LIMIT 1",
            [key]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            await conn.end();
            return NextResponse.json({ error: "Key does not exist" }, { status: 404 });
        }

        // Wert aktualisieren
        const [result] = await conn.execute(
            "UPDATE config SET `value` = ? WHERE `key` = ?",
            [value, key]
        );

        await conn.end();

        // affectedRows prüfen, ob sich etwas geändert hat
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ success: false, message: "Value unchanged" });
        }

        return NextResponse.json({ success: true, key, value });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "DB error", details: err.message }, { status: 500 });
    }
}
