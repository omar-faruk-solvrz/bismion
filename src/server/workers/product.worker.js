import { Worker } from "bullmq";
import redis from "../config/redis.js";
import Store from "../models/Store.model.js";
import Product from "../models/Product.model.js";
import { createWcClient } from "../services/woo.service.js";

new Worker(
  "product-sync",
  async (job) => {
    const store = await Store.findById(job.data.storeId);
    const wc = createWcClient(store);

    let page = 1;
    while (true) {
      const { data } = await wc.get("products", { per_page: 100, page });
      if (!data.length) break;

      for (const p of data) {
        await Product.updateOne(
          { storeId: store._id, wcProductId: p.id },
          { $set: { payload: p } },
          { upsert: true }
        );
      }
      page++;
    }

    store.lastSyncedAt = new Date();
    await store.save();
  },
  { connection: redis }
);
