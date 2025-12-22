import crypto from "node:crypto";
import Store from "../models/Store.model.js";

export const handleWooWebhook = async (req, res) => {
  try {
    console.log("📦 Product webhook received");

    // Woo does NOT sign product webhooks reliably
    // So we SKIP signature verification here

    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString() : req.body;

    console.log("Payload:", rawBody);

    // push to queue / sync product
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).send("OK");
  }
};
