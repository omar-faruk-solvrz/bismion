import Store from "../models/Store.model.js";
import { encrypt } from "../services/crypto.service.js";
import { productQueue } from "../queues/product.queue.js";

import WooCommerceRestApiPkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = WooCommerceRestApiPkg.default;

export const connectStore = async (req, res) => {
  try {
    const { storeUrl, consumerKey, consumerSecret } = req.body;

    const webhookSecret = "test-webhook-secret"; // test only

    // ✅ create WC client (NOW WORKS)
    const wc = new WooCommerceRestApi({
      url: storeUrl,
      consumerKey,
      consumerSecret,
      version: "wc/v3",
    });

    // ✅ verify credentials
    await wc.get("system_status");

    // ✅ save store
    const store = await Store.create({
      storeUrl,
      consumerKey: encrypt(consumerKey),
      consumerSecret: encrypt(consumerSecret),
      webhookSecret,
    });

    console.log("DB webhookSecret:", store.webhookSecret);

    // async initial sync
    await productQueue.add("initial-sync", { storeId: store._id });

    res.json({ success: true });
  } catch (err) {
    console.error("Connect store error:", err);
    res.status(500).json({ error: err.message });
  }
};
