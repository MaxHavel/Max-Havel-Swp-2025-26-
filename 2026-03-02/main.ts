import { Hono, Context } from "hono";
import { serveStatic } from "hono/deno";
import { getLieblinge } from "./db.ts";

const app = new Hono();

app.use("/*", serveStatic({ root: "./static" }));

app.get("/lieblinge", (c: Context) => {
    try {
        const lieblinge = getLieblinge();
        return c.json({
            success: true,
            data: lieblinge,
            count: lieblinge.length
        });
    } catch (error) {
        console.error("API-Fehler:", error);
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : "Unbekannter Fehler"
        }, 500);
    }
});

Deno.serve(app.fetch);
