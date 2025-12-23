import { syncSingleProduct } from "../services/productSync.js";

export const handleWooWebhook = (req, res) => {
  console.log("📦 Product webhook received");

  // ✅ ALWAYS respond first
  res.sendStatus(200);

  const payload = req.body;

  console.log("Parsed payload:", payload);

  const productId = payload?.id;

  if (!productId) {
    console.log("⚠️ No product ID found");
    return;
  }

  // ✅ background task
  setImmediate(async () => {
    try {
      await syncSingleProduct(productId);
      console.log("✅ Product synced:", productId);
    } catch (err) {
      console.error("❌ Sync failed:", err.message);
    }
  });
};
