import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // 🔑 IDs
    wooId: { type: Number, unique: true, index: true },
    slug: String,
    type: {
      type: String,
      enum: ["simple", "grouped", "variable", "external"],
    },

    // 🏷️ Basic Info
    name: String,
    status: String,
    description: String,
    shortDescription: String,
    sku: String,

    // 💰 Pricing
    price: String,
    regularPrice: String,
    salePrice: String,
    onSale: Boolean,
    priceHtml: String,

    // 📦 Stock
    manageStock: Boolean,
    stockQuantity: Number,
    stockStatus: String,
    purchasable: Boolean,
    totalSales: Number,

    // 🖼️ Media
    images: [
      {
        id: Number,
        src: String,
        alt: String,
      },
    ],

    // 🗂️ Taxonomy
    categories: [
      {
        id: Number,
        name: String,
        slug: String,
      },
    ],
    tags: [
      {
        id: Number,
        name: String,
        slug: String,
      },
    ],

    // 🔗 Grouped / Variable
    parentId: Number,
    groupedProducts: [Number],
    variations: [Number],

    // ⭐ Reviews
    averageRating: String,
    ratingCount: Number,
    reviewsAllowed: Boolean,

    // 🚚 Shipping
    weight: String,
    dimensions: {
      length: String,
      width: String,
      height: String,
    },
    shippingRequired: Boolean,

    // 🕒 Dates
    dateCreated: Date,
    dateModified: Date,

    // 🧠 Raw backup (optional but useful)
    raw: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
