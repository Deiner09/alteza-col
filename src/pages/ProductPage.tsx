import React from "react";
import {
  products,
  type Product,
} from "../data/products";
import { GlowButton } from "../components/ui/shiny-button-1";

type ProductPageProps = {
  slug: string;
};

function createProductSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductPage({
  slug,
}: ProductPageProps) {
  const product: Product | undefined =
    products.find(
      (item) =>
        createProductSlug(item.name) === slug
    );

  if (!product) {
    return (
      <section className="product-page">
        <div className="product-page__inner">
          <p className="product-page__eyebrow">
            ALTEZA
          </p>

          <h1 className="product-page__not-found">
            Producto no encontrado
          </h1>

          <a
            href="/"
            className="btn btn--primary"
          >
            Volver a la tienda
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="product-page">
      <div className="product-page__inner">

        <div className="product-page__media">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-page__image"
            />
          ) : (
            <div className="product-page__placeholder">
              <span>ALTEZA</span>
              <small>
                {product.category}
              </small>
            </div>
          )}
        </div>

        <div className="product-page__content">

          <p className="product-page__category">
            {product.category}
          </p>

          <h1 className="product-page__title">
            {product.name}
          </h1>

          <p className="product-page__price">
            {product.price}
          </p>

          <div className="product-page__divider" />

          <p className="product-page__description">
            Descubre una fórmula pensada para
            acompañar tu ritual de belleza y
            convertir cada momento en una
            experiencia Alteza.
          </p>

          <div className="product-page__quantity">

            <span>
              Cantidad
            </span>

            <div className="product-page__quantity-control">
              <button
                type="button"
                aria-label="Reducir cantidad"
              >
                −
              </button>

              <strong>
                1
              </strong>

              <button
                type="button"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

          </div>

          <GlowButton
  type="button"
  className="product-page__add"
>
  Agregar al carrito
</GlowButton>

          <button
            type="button"
            className="product-page__wishlist"
          >
            ♡ Agregar a favoritos
          </button>

          <a
            href="/"
            className="product-page__back"
          >
            ← Volver a la tienda
          </a>

        </div>

      </div>
    </section>
  );
}