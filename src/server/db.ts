import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Add connection retry logic
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });
};

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;

  // Test the connection
  db.$connect()
    .then(() => {
      console.log("Database connected successfully");
      console.log(`Using connection URL: ${env.DATABASE_URL.substring(0, 20)}...`);
      console.log(`Direct URL available: ${!!env.DIRECT_URL}`);
    })
    .catch((e) => console.error("Database connection error:", e));
}

// Add a function to test the connection
export async function testDbConnection() {
  try {
    // Simple query to test connection
    await db.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}
