import { PrismaClient } from "@prisma/client";

// Define a custom interface for globalThis with prisma property
interface GlobalThisWithPrisma {
  prisma?: PrismaClient;
}

// Just declare the variable exists in global scope
declare global {
  let prisma: PrismaClient | undefined;
}

// Use type assertion to access prisma on globalThis
export const db = ((globalThis as unknown) as GlobalThisWithPrisma).prisma || new PrismaClient();

// Use type assertion when assigning to globalThis.prisma
if (process.env.NODE_ENV !== "production") {
  ((globalThis as unknown) as GlobalThisWithPrisma).prisma = db;
}
