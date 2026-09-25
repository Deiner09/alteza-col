"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import { GlowButton } from "./shiny-button-1";

import type { Product } from "../../data/products";

type ProductCardProps = {
  product: Product;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  originalPrice?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
};

function createProductSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductCard({
  product,
  images,
  rating = 4.8,
  reviewCount = 142,
  originalPrice,
  isNew = false,
  isBestSeller = false,
  discount = 0,
}: ProductCardProps) {
  const productImages =
    images && images.length > 0
      ? images
      : product.image
        ? [product.image]
        : [];

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [isAddingToCart, setIsAddingToCart] =
    useState(false);

  const [isAddedToCart, setIsAddedToCart] =
    useState(false);

  const hasMultipleImages =
    productImages.length > 1;

  const nextImage = (
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    if (!hasMultipleImages) return;

    setCurrentImageIndex(
      (previous) =>
        (previous + 1) %
        productImages.length
    );
  };

  const previousImage = (
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    if (!hasMultipleImages) return;

    setCurrentImageIndex(
      (previous) =>
        (previous - 1 + productImages.length) %
        productImages.length
    );
  };

  const handleAddToCart = (
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      isAddingToCart ||
      isAddedToCart
    ) {
      return;
    }

    setIsAddingToCart(true);

    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAddedToCart(true);

      setTimeout(() => {
        setIsAddedToCart(false);
      }, 1800);
    }, 650);
  };

  const productUrl = `/producto/${createProductSlug(
    product.name
  )}`;

  return (
    <article className="alteza-product-card group w-full">
      <div className="relative overflow-hidden bg-[#f6e8e5]">

        {/* IMAGEN */}

        <a
          href={productUrl}
          className="block"
          aria-label={`Ver ${product.name}`}
        >
          <div className="relative aspect-[0.84] overflow-hidden sm:aspect-3/4">

            {productImages.length > 0 ? (
              <motion.img
                key={currentImageIndex}
                src={
                  productImages[
                    currentImageIndex
                  ]
                }
                alt={product.name}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-[1.035]
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  bg-[radial-gradient(circle_at_50%_30%,#f5ddd9,#c1878d)]
                  text-white
                "
              >
                <div className="text-center">
                  <span
                    className="
                      block
                      font-serif
                      text-4xl
                      tracking-[0.08em]
                    "
                  >
                    ALTEZA
                  </span>

                  <small
                    className="
                      mt-2
                      block
                      text-[8px]
                      uppercase
                      tracking-[0.22em]
                    "
                  >
                    {product.category}
                  </small>
                </div>
              </div>
            )}

            {/* BADGES */}

            <div
              className="
                absolute
                left-4
                top-4
                z-10
                flex
                flex-col
                gap-2
              "
            >
              {isNew && (
                <span
                  className="
                    bg-[#241b1c]
                    px-3
                    py-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                  "
                >
                  Nuevo
                </span>
              )}

              {isBestSeller && (
                <span
                  className="
                    bg-[#a7656d]
                    px-3
                    py-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                  "
                >
                  Bestseller
                </span>
              )}

              {discount > 0 && (
                <span
                  className="
                    bg-white
                    px-3
                    py-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#34292a]
                  "
                >
                  -{discount}%
                </span>
              )}
            </div>

            {/* FAVORITOS */}

            <button
              type="button"
              aria-label={
                isWishlisted
                  ? "Quitar de favoritos"
                  : "Agregar a favoritos"
              }
              className="
                absolute
                right-4
                top-4
                z-10
                grid
                h-9
                w-9
                place-items-center
                rounded-full
                bg-white/90
                text-[#34292a]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-[#a7656d]
                hover:text-white
              "
              onClick={(
                event
              ) => {
                event.preventDefault();
                event.stopPropagation();

                setIsWishlisted(
                  (previous) =>
                    !previous
                );
              }}
            >
              <Heart
                className="h-4 w-4"
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
                strokeWidth={1.5}
              />
            </button>

            {/* FLECHAS */}

            {hasMultipleImages && (
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-1/2
                  z-10
                  flex
                  -translate-y-1/2
                  items-center
                  justify-between
                  px-3
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:pointer-events-auto
                  group-hover:opacity-100
                "
              >
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  className="
                    grid
                    h-8
                    w-8
                    place-items-center
                    rounded-full
                    bg-white/90
                    text-[#34292a]
                    backdrop-blur-sm
                  "
                  onClick={
                    previousImage
                  }
                >
                  <ChevronLeft
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Siguiente imagen"
                  className="
                    grid
                    h-8
                    w-8
                    place-items-center
                    rounded-full
                    bg-white/90
                    text-[#34292a]
                    backdrop-blur-sm
                  "
                  onClick={nextImage}
                >
                  <ChevronRight
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            )}

            {/* INDICADORES */}

            {hasMultipleImages && (
              <div
                className="
                  absolute
                  bottom-4
                  left-1/2
                  z-10
                  flex
                  -translate-x-1/2
                  gap-1.5
                "
              >
                {productImages.map(
                  (_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Ver imagen ${
                        index + 1
                      }`}
                      className={`
                        h-1.5
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          index ===
                          currentImageIndex
                            ? "w-5 bg-white"
                            : "w-1.5 bg-white/50"
                        }
                      `}
                      onClick={(
                        event
                      ) => {
                        event.preventDefault();
                        event.stopPropagation();

                        setCurrentImageIndex(
                          index
                        );
                      }}
                    />
                  )
                )}
              </div>
            )}

            {/* QUICK VIEW */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-4
                bottom-4
                z-10
                translate-y-3
                opacity-0
                transition-all
                duration-300
                group-hover:pointer-events-auto
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <span
                className="
                  flex
                  min-h-11
                  items-center
                  justify-center
                  bg-white/95
                  px-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#241b1c]
                  backdrop-blur-sm
                "
              >
                Ver producto
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* INFORMACIÓN */}

      <div className="pt-4">

        <p
          className="
            mb-2
            font-sans
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#a7656d]
          "
        >
          {product.category}
        </p>

        <a
          href={productUrl}
          className="
            block
            font-serif
            text-[21px] sm:text-[24px]
            font-medium
            leading-[1.05]
            tracking-[-0.01em]
            text-[#252122]
            transition-colors
            duration-300
            hover:text-[#a7656d]
          "
        >
          {product.name}
        </a>

        {/* RATING */}

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
          "
        >
          <div className="flex items-center gap-0.5">
            {Array.from(
              { length: 5 },
              (_, index) => (
                <Star
                  key={index}
                  className="h-3 w-3"
                  fill={
                    index < Math.round(rating)
                      ? "currentColor"
                      : "none"
                  }
                  strokeWidth={1.4}
                  style={{
                    color:
                      "#c89a41",
                  }}
                />
              )
            )}
          </div>

          <span
            className="
              text-[9px]
              text-[#746c6d]
            "
          >
            {rating.toFixed(1)}
            {" "}
            ({reviewCount})
          </span>
        </div>

        {/* PRECIO */}

        <div
          className="
            mt-2.5
            flex
            items-baseline
            gap-2
          "
        >
          <span
            className="
              font-sans
              text-[14px]
              font-semibold
              text-[#252122]
            "
          >
            {product.price}
          </span>

          {originalPrice && (
            <span
              className="
                font-sans
                text-[11px]
                text-[#746c6d]
                line-through
              "
            >
              {originalPrice}
            </span>
          )}
        </div>

        {/* CARRITO */}

        <GlowButton
  type="button"
  className="alteza-product-card__cart w-full sm:w-auto"
  onClick={handleAddToCart}
  disabled={
    isAddingToCart ||
    isAddedToCart
  }
>
  {isAddingToCart ? (
    <>
      <Loader2
        className="h-4 w-4 animate-spin"
        strokeWidth={1.5}
      />
      Agregando
    </>
  ) : isAddedToCart ? (
    <>
      <Check
        className="h-4 w-4"
        strokeWidth={1.5}
      />
      Agregado
    </>
  ) : (
    <>
      <ShoppingCart
        className="h-4 w-4"
        strokeWidth={1.5}
      />
      Agregar al carrito
    </>
  )}
</GlowButton>

      </div>
    </article>
  );
}

export default ProductCard;