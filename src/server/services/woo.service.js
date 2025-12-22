import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = WooCommerceRestApi.default;

export const woo = new WooCommerce({
  url: process.env.WC_STORE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});
