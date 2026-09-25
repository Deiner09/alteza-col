import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ProductCard from "../components/ui/product-card-1";
import {
  products,
  type Product,
} from "../data/products";

type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "name";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function parsePrice(price: string) {
  const numericPrice = Number(
    price.replace(/[^\d]/g, "")
  );

  return Number.isFinite(numericPrice)
    ? numericPrice
    : 0;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat(
    "es-CO",
    {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function getCategoryFromUrl() {
  const params = new URLSearchParams(
    window.location.search
  );

  return params.get("categoria") || "";
}

function updateCategoryUrl(
  category: string
) {
  const url = new URL(
    window.location.href
  );

  if (category) {
    url.searchParams.set(
      "categoria",
      category
    );
  } else {
    url.searchParams.delete(
      "categoria"
    );
  }

  window.history.replaceState(
    {},
    "",
    url.toString()
  );
}

export default function ShopPage() {
  const initialCategory =
    getCategoryFromUrl();

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>(
      "recommended"
    );

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const categories = useMemo(() => {
    const uniqueCategories =
      Array.from(
        new Set(
          products.map(
            (product) =>
              product.category
          )
        )
      );

    return uniqueCategories;
  }, []);

  const priceLimits = useMemo(() => {
    const prices = products.map(
      (product) =>
        parsePrice(product.price)
    );

    return {
      min: Math.min(...prices, 0),
      max: Math.max(...prices, 0),
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedCategory =
      normalizeText(
        selectedCategory
      );

    const minimum =
      minPrice.trim() === ""
        ? null
        : Number(minPrice);

    const maximum =
      maxPrice.trim() === ""
        ? null
        : Number(maxPrice);

    const filtered = products.filter(
      (product) => {
        const productPrice =
          parsePrice(product.price);

        const matchesCategory =
          !normalizedCategory ||
          normalizeText(
            product.category
          ) === normalizedCategory;

        const matchesMinPrice =
          minimum === null ||
          productPrice >= minimum;

        const matchesMaxPrice =
          maximum === null ||
          productPrice <= maximum;

        return (
          matchesCategory &&
          matchesMinPrice &&
          matchesMaxPrice
        );
      }
    );

    return [...filtered].sort(
      (a, b) => {
        if (
          sortBy ===
          "price-asc"
        ) {
          return (
            parsePrice(a.price) -
            parsePrice(b.price)
          );
        }

        if (
          sortBy ===
          "price-desc"
        ) {
          return (
            parsePrice(b.price) -
            parsePrice(a.price)
          );
        }

        if (
          sortBy === "name"
        ) {
          return a.name.localeCompare(
            b.name,
            "es"
          );
        }

        return 0;
      }
    );
  }, [
    selectedCategory,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const activeFilterCount =
    Number(
      selectedCategory !== ""
    ) +
    Number(minPrice !== "") +
    Number(maxPrice !== "");

  const pageTitle =
    selectedCategory ||
    "Todos los productos";

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("recommended");

    updateCategoryUrl("");

    setFiltersOpen(false);
  };

  const selectCategory = (
    category: string
  ) => {
    setSelectedCategory(category);

    updateCategoryUrl(
      category
    );
  };

  useEffect(() => {
    const handlePopState = () => {
      setSelectedCategory(
        getCategoryFromUrl()
      );
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  return (
    <main className="shop-page">

      {/* =====================================
          SHOP HEADER
      ====================================== */}

      <section className="shop-page__header">

        <div className="container">

          <p className="section-eyebrow">
            Tienda Alteza
          </p>

          <h1 className="shop-page__title">
            {pageTitle}
          </h1>

          <p className="shop-page__description">
            Encuentra productos para tu ritual
            de belleza.
          </p>

        </div>

      </section>

      {/* =====================================
          CATEGORY NAVIGATION
      ====================================== */}

      <section className="shop-page__categories">

        <div className="container">

          <div
            className="
              shop-page__category-scroll
            "
          >

            <button
              type="button"
              className={`
                shop-page__category-button
                ${
                  selectedCategory === ""
                    ? "is-active"
                    : ""
                }
              `}
              onClick={() =>
                selectCategory("")
              }
            >
              Todos
            </button>

            {categories.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  className={`
                    shop-page__category-button
                    ${
                      normalizeText(
                        selectedCategory
                      ) ===
                      normalizeText(
                        category
                      )
                        ? "is-active"
                        : ""
                    }
                  `}
                  onClick={() =>
                    selectCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================
          PRODUCTS
      ====================================== */}

      <section
        className="
          shop-page__products
        "
      >

        <div className="container">

          {/* TOOLBAR */}

          <div
            className="
              shop-page__toolbar
            "
          >

            <span>
              {filteredProducts.length}{" "}
              {filteredProducts.length ===
              1
                ? "producto"
                : "productos"}
            </span>

            <div
              className="
                shop-page__toolbar-actions
              "
            >

              <button
                type="button"
                className="
                  shop-page__filter-trigger
                "
                onClick={() =>
                  setFiltersOpen(
                    true
                  )
                }
              >
                Filtros
                {activeFilterCount >
                  0 && (
                  <span>
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <label
                className="
                  shop-page__sort
                "
              >
                <span>
                  Ordenar
                </span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target
                        .value as SortOption
                    )
                  }
                  aria-label="Ordenar productos"
                >
                  <option value="recommended">
                    Recomendados
                  </option>

                  <option value="price-asc">
                    Precio menor
                  </option>

                  <option value="price-desc">
                    Precio mayor
                  </option>

                  <option value="name">
                    Nombre A-Z
                  </option>
                </select>
              </label>

            </div>

          </div>

          <div
            className="
              shop-page__layout
            "
          >

            {/* =================================
                DESKTOP FILTERS
            ================================= */}

            <aside
              className="
                shop-page__filters
              "
            >

              <div
                className="
                  shop-page__filters-header
                "
              >

                <span>
                  Filtrar
                </span>

                {activeFilterCount >
                  0 && (
                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                  >
                    Limpiar
                  </button>
                )}

              </div>

              <div
                className="
                  shop-page__filter-group
                "
              >

                <p>
                  Categoría
                </p>

                <div
                  className="
                    shop-page__filter-options
                  "
                >

                  <button
                    type="button"
                    className={
                      selectedCategory ===
                      ""
                        ? "is-selected"
                        : ""
                    }
                    onClick={() =>
                      selectCategory(
                        ""
                      )
                    }
                  >
                    Todos
                  </button>

                  {categories.map(
                    (category) => (
                      <button
                        key={category}
                        type="button"
                        className={
                          normalizeText(
                            selectedCategory
                          ) ===
                          normalizeText(
                            category
                          )
                            ? "is-selected"
                            : ""
                        }
                        onClick={() =>
                          selectCategory(
                            category
                          )
                        }
                      >
                        {category}
                      </button>
                    )
                  )}

                </div>

              </div>

              <div
                className="
                  shop-page__filter-group
                "
              >

                <p>
                  Precio
                </p>

                <div
                  className="
                    shop-page__price-inputs
                  "
                >

                  <label>
                    <span>
                      Desde
                    </span>

                    <input
                      type="number"
                      min="0"
                      max={
                        priceLimits.max
                      }
                      value={minPrice}
                      onChange={(event) =>
                        setMinPrice(
                          event.target
                            .value
                        )
                      }
                      placeholder="0"
                    />
                  </label>

                  <label>
                    <span>
                      Hasta
                    </span>

                    <input
                      type="number"
                      min="0"
                      max={
                        priceLimits.max
                      }
                      value={maxPrice}
                      onChange={(event) =>
                        setMaxPrice(
                          event.target
                            .value
                        )
                      }
                      placeholder={String(
                        priceLimits.max
                      )}
                    />
                  </label>

                </div>

                <div
                  className="
                    shop-page__price-range
                  "
                >
                  {formatPrice(
                    priceLimits.min
                  )}

                  <span>—</span>

                  {formatPrice(
                    priceLimits.max
                  )}
                </div>

              </div>

            </aside>

            {/* =================================
                PRODUCT GRID
            ================================= */}

            <div
              className="
                shop-page__catalog
              "
            >

              {filteredProducts.length >
              0 ? (
                <div
                  className="
                    product-grid
                  "
                >

                  {filteredProducts.map(
                    (
                      product
                    ) => (
                      <ProductCard
                        key={
                          product.name
                        }
                        product={
                          product
                        }
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
              ) : (
                <div
                  className="
                    shop-page__empty
                  "
                >

                  <p
                    className="
                      section-eyebrow
                    "
                  >
                    Sin resultados
                  </p>

                  <h2>
                    No encontramos
                    productos.
                  </h2>

                  <p>
                    Prueba con otra categoría
                    o ajusta el rango de precio.
                  </p>

                  <button
                    type="button"
                    className="
                      shop-page__empty-link
                    "
                    onClick={
                      clearFilters
                    }
                  >
                    Limpiar filtros →
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          MOBILE FILTER PANEL
      ====================================== */}

      {filtersOpen && (
        <div
          className="
            shop-page__filter-overlay
          "
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de productos"
          onClick={() =>
            setFiltersOpen(
              false
            )
          }
        >

          <div
            className="
              shop-page__filter-panel
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div
              className="
                shop-page__filter-panel-top
              "
            >

              <span>
                Filtros
              </span>

              <button
                type="button"
                aria-label="Cerrar filtros"
                onClick={() =>
                  setFiltersOpen(
                    false
                  )
                }
              >
                ×
              </button>

            </div>

            <div
              className="
                shop-page__filter-group
              "
            >

              <p>
                Categoría
              </p>

              <div
                className="
                  shop-page__filter-options
                "
              >

                <button
                  type="button"
                  className={
                    selectedCategory ===
                    ""
                      ? "is-selected"
                      : ""
                  }
                  onClick={() =>
                    selectCategory(
                      ""
                    )
                  }
                >
                  Todos
                </button>

                {categories.map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      className={
                        normalizeText(
                          selectedCategory
                        ) ===
                        normalizeText(
                          category
                        )
                          ? "is-selected"
                          : ""
                      }
                      onClick={() =>
                        selectCategory(
                          category
                        )
                      }
                    >
                      {category}
                    </button>
                  )
                )}

              </div>

            </div>

            <div
              className="
                shop-page__filter-group
              "
            >

              <p>
                Precio
              </p>

              <div
                className="
                  shop-page__price-inputs
                "
              >

                <label>
                  <span>
                    Desde
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(event) =>
                      setMinPrice(
                        event.target
                          .value
                      )
                    }
                    placeholder="0"
                  />
                </label>

                <label>
                  <span>
                    Hasta
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(
                        event.target
                          .value
                      )
                    }
                    placeholder={String(
                      priceLimits.max
                    )}
                  />
                </label>

              </div>

            </div>

            <label
              className="
                shop-page__mobile-sort
              "
            >
              <span>
                Ordenar por
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption
                  )
                }
              >
                <option value="recommended">
                  Recomendados
                </option>

                <option value="price-asc">
                  Precio menor
                </option>

                <option value="price-desc">
                  Precio mayor
                </option>

                <option value="name">
                  Nombre A-Z
                </option>
              </select>
            </label>

            <div
              className="
                shop-page__filter-panel-actions
              "
            >

              <button
                type="button"
                className="
                  shop-page__clear-button
                "
                onClick={
                  clearFilters
                }
              >
                Limpiar
              </button>

              <button
                type="button"
                className="
                  shop-page__apply-button
                "
                onClick={() =>
                  setFiltersOpen(
                    false
                  )
                }
              >
                Ver productos
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}