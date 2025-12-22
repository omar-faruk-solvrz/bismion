import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import storeRoutes from "./routes/store.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import productRoutes from "./routes/product.routes.js";

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gv1dy3j.mongodb.net/?appName=Cluster0`;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const app = express();

// 👇 RAW BODY FOR WEBHOOKS
app.use(
  "/api/webhooks",
  express.raw({
    type: ["application/json", "application/x-www-form-urlencoded"],
  })
);

// 👇 JSON FOR NORMAL APIs
app.use("/api/stores", express.json());

app.use("/api/stores", storeRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
