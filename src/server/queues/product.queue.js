import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const productQueue = new Queue("product-sync", {
  connection: redisConnection,
});
