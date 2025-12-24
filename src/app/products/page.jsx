import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:5001/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => {
          const image = p.raw?.images?.[0]?.src;
          console.log(image);
          const price =
            p.type === "grouped"
              ? "View options"
              : p.raw?.price
              ? `৳ ${p.raw.price}`
              : "Out of stock";

          return (
            <div
              key={p._id}
              className="border rounded-xl p-4 hover:shadow transition"
            >
              <div className="relative w-full h-52 mb-3">
                <img
                  src={image || "/placeholder.png"}
                  alt={p.name}
                  className="object-cover rounded"
                />
              </div>

              <h3 className="font-medium line-clamp-2">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{price}</p>

              <Link
                href={p.raw?.permalink || "#"}
                target="_blank"
                className="inline-block mt-3 text-sm text-blue-600 hover:underline"
              >
                View product →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
