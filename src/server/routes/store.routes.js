import { Router } from "express";
import { connectStore } from "../controllers/store.controller.js";

const router = Router();
router.post("/connect", connectStore);

export default router;
