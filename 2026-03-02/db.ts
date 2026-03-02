import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("lieblingsessen.db");

export function getLieblinge() {
    const results: { name: string; essen: string }[] = [];
    for (const row of db.query(`
        SELECT p.name, e.essen
        FROM person p
        JOIN essen e ON p.lieblingsessen = e.id
    `)) {
        results.push({ name: row[0] as string, essen: row[1] as string });
    }
    return results;
}
