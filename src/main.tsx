import React from "react";
import ReactDOM from "react-dom/client";

import ImageStreamHero from "@/components/ui/image-stream-hero";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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

  <a
    href="#shop"
    className="btn btn--primary"
    style={{
      display: "inline-flex",
      marginTop: "28px",
      minWidth: "170px",
      justifyContent: "center",
    }}
  >
    Comprar ahora →
  </a>
</div>
    </ImageStreamHero>
  </React.StrictMode>
);