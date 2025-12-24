import dotenv from "dotenv";
dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL is not defined in .env");
}

export const redisConnection = {
  url: process.env.REDIS_URL,
};

console.log(" Redis config loaded:", redisConnection);
