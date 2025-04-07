import { PrismaClient } from "@prisma/client";

// Define a custom interface for globalThis with prisma property
interface GlobalThisWithPrisma {
  prisma?: PrismaClient;
}

// Just declare the variable exists in global scope
declare global {
  let prisma: PrismaClient | undefined;
}

// Create a function to handle connection errors
function getPrismaClient() {
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    
    return client;
  } catch (error) {
    console.error("Failed to initialize Prisma Client:", error);
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Use type assertion to access prisma on globalThis
export const db = ((globalThis as unknown) as GlobalThisWithPrisma).prisma || getPrismaClient();

// Use type assertion when assigning to globalThis.prisma
if (process.env.NODE_ENV !== "production") {
  ((globalThis as unknown) as GlobalThisWithPrisma).prisma = db;
}
