import { Router } from "express";
import { handleWooWebhook } from "../controllers/webhook.controller.js";

const router = Router();
router.post("/woocommerce", handleWooWebhook);

export default router;
