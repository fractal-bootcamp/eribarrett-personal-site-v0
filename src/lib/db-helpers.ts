import { db } from "~/server/db";

export async function ensureDbConnection() {
    let retries = 5;
    while (retries > 0) {
        try {
            await db.$connect();
            console.log("Database connection established");
            return true;
        } catch (error) {
            console.error(`Database connection failed (${retries} retries left):`, error);
            retries--;
            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    return false;
} 