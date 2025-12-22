import { woo } from "./woo.service.js";
import Product from "../models/Product.model.js";

export async function syncProducts(page = 1) {
  const { data } = await woo.get("products", {
    per_page: 50,
    page,
  });

  console.log(data);

  for (const p of data) {
    await Product.updateOne(
      { wooId: p.id },
      {
        wooId: p.id,
        slug: p.slug,
        type: p.type,

        name: p.name,
        status: p.status,
        description: p.description,
        shortDescription: p.short_description,
        sku: p.sku,

        price: p.price,
        regularPrice: p.regular_price,
        salePrice: p.sale_price,
        onSale: p.on_sale,
        priceHtml: p.price_html,

        manageStock: p.manage_stock,
        stockQuantity: p.stock_quantity,
        stockStatus: p.stock_status,
        purchasable: p.purchasable,
        totalSales: p.total_sales,

        images: p.images,
        categories: p.categories,
        tags: p.tags,

        parentId: p.parent_id,
        groupedProducts: p.grouped_products,
        variations: p.variations,

        averageRating: p.average_rating,
        ratingCount: p.rating_count,
        reviewsAllowed: p.reviews_allowed,

        weight: p.weight,
        dimensions: p.dimensions,
        shippingRequired: p.shipping_required,

        dateCreated: p.date_created,
        dateModified: p.date_modified,

        raw: p, // 🔥 keep full Woo payload
      },
      { upsert: true }
    );
  }

  return data.length;
}
