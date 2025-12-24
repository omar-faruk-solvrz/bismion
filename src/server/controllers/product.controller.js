// src/server/controllers/product.controller.js

import { productQueue } from "../queues/product.queue.js";

export const syncStoreProducts = async (req, res) => {
  const { storeId } = req.body;

  await productQueue.add(
    "sync",
    { storeId },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    }
  );

  return res.json({
    success: true,
    message: "Product sync job queued",
  });
};
