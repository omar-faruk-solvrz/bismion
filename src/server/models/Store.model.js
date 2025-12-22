import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    storeUrl: String,
    consumerKey: String, // encrypted
    consumerSecret: String, // encrypted
    webhookSecret: String,
    lastSyncedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Store", StoreSchema);
