import { syncAllProducts, syncSingleProduct } from "../services/productSync.js";
import querystring from "node:querystring";

export const handleWooWebhook = async (req, res) => {
  try {
    console.log("📦 Product webhook received");

    let payload = {};

    // 🔑 Detect content type
    const contentType = req.headers["content-type"] || "";

    if (Buffer.isBuffer(req.body)) {
      const raw = req.body.toString();

      if (contentType.includes("application/json")) {
        payload = JSON.parse(raw);
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        payload = querystring.parse(raw);
      }
    } else {
      payload = req.body;
    }

    console.log("Parsed payload:", payload);

    if (!payload.id) {
      console.log("No product ID found");
      return;
    }
    // Woo sends product ID as `id`

    setImmediate(async () => {
      try {
        await syncSingleProduct(payload.id);
        console.log("✅ Product synced:", payload.id);
      } catch (err) {
        console.error("❌ Sync failed:", err.message);
      }
    });

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).send("OK"); // never fail Woo
  }
};
