import { Database } from "@db/sqlite";

const db = new Database("lieblingsessen.db");

export interface Lieblings {
    name: string;
    essen: string;
}

export function getLieblinge(): Lieblings[] {
    try {
        const results: Lieblings[] = [];
        const stmt = db.prepare(`
            SELECT p.name, e.essen
            FROM person p
            JOIN essen e ON p.lieblingsessen = e.id
        `);
        
        for (const row of stmt.all() as Array<[string, string]>) {
            results.push({ 
                name: row[0], 
                essen: row[1] 
            });
        }
        return results;
    } catch (error) {
        console.error("Fehler beim Abrufen der Lieblingsessen:", error);
        throw new Error("Datenbankfehler beim Abrufen der Lieblingsessen");
    }
}
