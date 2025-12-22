import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const productQueue = new Queue("product-sync", {
  connection: redis,
});
