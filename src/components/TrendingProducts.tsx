import ProductCard from "./ui/product-card-1";
import { products } from "../data/products";

export default function TrendingProducts() {
  const trendingProducts = products.slice(0, 4);

  return (
    <section
      id="shop"
      className="trending-products"
    >
      <div className="container">

        <div className="section-header">
          <div>
            <p className="section-eyebrow">
              Selección Alteza
            </p>

            <h2 className="section-title">
  Productos{" "}
  <span>destacados.</span>
</h2>
          </div>

          <a
            href="#shop"
            className="section-link"
          >
            Ver todos los productos <span>→</span>
          </a>
        </div>

        <div className="product-grid">
          {trendingProducts.map(
            (product) => (
              <ProductCard
  key={product.name}
  product={product}
  isNew={
    product.name ===
    "Crema Hidratante Facial"
  }
  isBestSeller={
    product.name ===
    "Blush Rose Glow"
                }
              />
            )
          )}
        </div>

      </div>
    </section>
  );
}