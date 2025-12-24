import { productQueue } from "../queues/product.queue.js";

export const handleWooWebhook = async (req, res) => {
  console.log(" Product webhook received");

  // ✅ Respond immediately to WooCommerce
  res.sendStatus(200);

  const payload = req.body;
  const productId = payload?.id;

  if (!productId) {
    console.log(" No product ID found");
    return;
  }

  try {
    await productQueue.add(
      "sync-single-product",
      { productId },
      {
        removeOnComplete: true,
        removeOnFail: 50,
      }
    );

    console.log("Job added to queue:", productId);
  } catch (err) {
    console.error("❌ Failed to add job:", err.message);
  }
};
