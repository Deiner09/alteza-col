import React from "react";
import ReactDOM from "react-dom/client";

import ImageStreamHero from "./components/ui/image-stream-hero";
import { GlowButton } from "./components/ui/shiny-button-1";
import TrendingProducts from "./components/TrendingProducts";
import Categories from "./components/Categories";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";

import "./scss/main.scss";
import "./style.css";

const altezaImages = [
  {
    src: "/images/hero/1.jpg",
    alt: "Belleza editorial Alteza",
  },
  {
    src: "/images/hero/2.jpg",
    alt: "Modelo de belleza Alteza",
  },
  {
    src: "/images/hero/3.webp",
    alt: "Colección de belleza Alteza",
  },
  {
    src: "/images/hero/4.jpg",
    alt: "Maquillaje Alteza",
  },
  {
    src: "/images/hero/5.jpg",
    alt: "Beauty editorial Alteza",
  },
  {
    src: "/images/hero/6.jpg",
    alt: "Skincare Alteza",
  },
  {
    src: "/images/hero/7.jpg",
    alt: "Maquillaje editorial Alteza",
  },
  {
    src: "/images/hero/8.jpg",
    alt: "Belleza Alteza",
  },
  {
    src: "/images/hero/9.jpg",
    alt: "Campaña Alteza",
  },
  {
    src: "/images/hero/10.jpg",
    alt: "Accesorios de belleza Alteza",
  },
  {
    src: "/images/hero/11.jpg",
    alt: "Detalle beauty Alteza",
  },
];

function HomePage() {
  return (
    <>
      <ImageStreamHero
        images={altezaImages}
        cards={11}
        speed={28}
        axis={56}
      >
        <div className="text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-stone-600">
            BEAUTY · CARE · COLLECTION
          </p>

          <h1 className="font-serif text-7xl font-medium tracking-[0.16em] text-stone-900 md:text-8xl">
            ALTEZA
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm tracking-[0.08em] text-stone-600 md:text-base">
            Belleza que se siente. Elegancia que permanece.
          </p>

          <GlowButton
  href="#collections"
  className="mt-7"
>
  Explorar colección →
</GlowButton>
        </div>
      </ImageStreamHero>

      <Categories />

<TrendingProducts />
    </>
  );
}
function App() {
  const pathname = window.location.pathname;

  const productPrefix = "/producto/";

  if (pathname.startsWith(productPrefix)) {
    const slug = decodeURIComponent(
      pathname.slice(productPrefix.length)
    );

    return <ProductPage slug={slug} />;
  }

  if (pathname === "/tienda") {
    return <ShopPage />;
  }

  return <HomePage />;
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);