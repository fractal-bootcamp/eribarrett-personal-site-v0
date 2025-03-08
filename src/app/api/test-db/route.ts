import { db } from "~/server/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Test basic connection
        await db.$queryRaw`SELECT 1+1 AS result`;

        // Get post count
        const postCount = await db.post.count();

        // Get all posts
        const posts = await db.post.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            success: true,
            message: "Database connection successful",
            postCount,
            posts,
        });
    } catch (error) {
        console.error("Database test error:", error);
        return NextResponse.json({
            success: false,
            message: "Database connection failed",
            error: String(error),
        }, { status: 500 });
    }
} 