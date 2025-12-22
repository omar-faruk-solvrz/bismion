import { Router } from "express";
import Product from "../models/Product.model.js";
import { syncProducts } from "../services/productSync.js";

const router = Router();

/**
 * 🔹 GET PRODUCTS (for Next.js frontend)
 * GET /api/products
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ status: "publish" })
      .sort({ updatedAt: -1 })
      .limit(50)
      .lean();

    return res.json(products);
  } catch (err) {
    console.error("GET /products error:", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * 🔹 FULL SYNC FROM WOOCOMMERCE
 * POST /api/products/sync
 */
router.post("/sync", async (req, res) => {
  try {
    let page = 1;

    while (true) {
      const count = await syncProducts(page);
      if (count < 50) break;
      page++;
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("SYNC error:", err);
    return res.status(500).json({ error: "Sync failed" });
  }
});

export default router;
