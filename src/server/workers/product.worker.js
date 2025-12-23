import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { syncSingleProduct } from "../services/productSync.js";

console.log("🚀 Worker starting...");
console.log("🔌 Redis connection:", redisConnection);

new Worker(
  "product-sync",
  async (job) => {
    // const { productId } = job.data;
    // console.log("🔄 Syncing product:", productId);

    // await syncSingleProduct(productId);
    // console.log("✅ Synced:", productId);
  },
  {
    connection: redisConnection,
  }
);
