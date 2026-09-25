import React, { useMemo, useState } from "react";

import {
  products as searchProducts,
  type Product,
} from "../../data/products";

type StreamImage = {
  src: string;
  alt: string;
};

type ImageStreamHeroProps = {
  images?: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  children?: React.ReactNode;
  className?: string;
};

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function createProductSlug(name: string) {
  return normalizeSearchText(name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const DEFAULT_IMAGES: StreamImage[] = [
  {
    src: "/images/hero/alteza-modelo-01.webp",
    alt: "Modelo editorial Alteza",
  },
  {
    src: "/images/hero/8.webp",
    alt: "Campaña de belleza Alteza",
  },
];

export function ImageStreamHero({
  images = DEFAULT_IMAGES,
  cards = 9,
  speed = 24,
  axis = 56,
  children,
  className = "",
}: ImageStreamHeroProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    const term = normalizeSearchText(
      searchTerm.trim()
    );

    if (!term) {
      return searchProducts.slice(0, 5);
    }

    return searchProducts
      .filter((product) => {
        const searchableText =
          normalizeSearchText(
            `${product.name} ${product.category} ${product.keywords}`
          );

        return searchableText.includes(term);
      })
      .slice(0, 5);
  }, [searchTerm]);

  const streamImages = images.length
    ? images
    : DEFAULT_IMAGES;

  const leftCards = Array.from(
    { length: cards },
    (_, index) =>
      streamImages[index % streamImages.length]
  );

  const rightCards = Array.from(
    { length: cards },
    (_, index) =>
      streamImages[
        (index + 2) % streamImages.length
      ]
  );

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      <style>{`
        .alteza-image-stream {
          position: relative;
          width: 100%;
          height: min(760px, 76vh);
          min-height: 620px;
          margin: 0;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(
              ellipse at 50% 36%,
              #fffaf8 0%,
              #faeeeb 38%,
              #f6e3e0 72%,
              #efd6d3 100%
            );
        }

        /* =========================================
           NAVEGACIÓN
        ========================================= */

        .alteza-hero-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;

          height: 104px;

          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;

          gap: 32px;

          padding: 0 32px;
        }

        .alteza-hero-nav::after {
          content: "";

          position: absolute;
          left: 32px;
          right: 32px;
          bottom: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(67, 49, 48, 0.12) 18%,
              rgba(67, 49, 48, 0.12) 82%,
              transparent
            );
        }

        .alteza-hero-nav__badge {
          justify-self: start;

          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 94px;
          min-height: 58px;

          padding: 8px 10px;

          border: 1px solid rgba(167, 101, 109, 0.32);
          border-radius: 4px;

          background: rgba(255, 250, 248, 0.34);

          color: #9f7074;

          text-decoration: none;

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.5);

          transition:
            border-color 180ms ease,
            color 180ms ease,
            background 180ms ease,
            transform 180ms ease;
        }

        .alteza-hero-nav__badge:hover {
          border-color: rgba(159, 112, 116, 0.55);

          background: rgba(255, 250, 248, 0.58);

          color: #8d5c62;

          transform: translateY(-1px);
        }

        .alteza-hero-nav__badge-name {
          display: block;

          font-family:
            "Cormorant Garamond",
            Georgia,
            "Times New Roman",
            serif;

          font-size: 25px;
          font-weight: 500;

          letter-spacing: 0.04em;
          line-height: 0.9;
        }

        .alteza-hero-nav__badge-subtitle {
          display: block;

          margin-top: 6px;

          font-family:
            "Montserrat",
            Arial,
            Helvetica,
            sans-serif;

          font-size: 5px;
          font-weight: 600;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }

        .alteza-hero-nav__links {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: clamp(22px, 2.1vw, 38px);
        }

        .alteza-hero-nav__link {
          color: #34292a;

          text-decoration: none;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 12px;
          font-weight: 500;

          letter-spacing: 0.15em;

          text-transform: uppercase;

          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .alteza-hero-nav__link:hover {
          opacity: 0.6;

          transform: translateY(-1px);
        }

        .alteza-hero-nav__actions {
          justify-self: end;

          display: flex;
          align-items: center;

          gap: 18px;
        }

        .alteza-hero-nav__action {
          position: relative;

          width: 28px;
          height: 28px;

          display: grid;
          place-items: center;

          padding: 0;

          border: 0;

          background: transparent;

          color: #34292a;

          cursor: pointer;
        }

        .alteza-hero-nav__action svg {
          display: block;

          width: 18px;
          height: 18px;

          transition:
            transform 180ms ease,
            opacity 180ms ease;
        }

        .alteza-hero-nav__action:hover svg {
          transform: scale(1.08);

          opacity: 0.65;
        }

        .alteza-hero-nav__cart-count {
          position: absolute;

          top: -7px;
          right: -8px;

          min-width: 18px;
          height: 18px;

          display: grid;
          place-items: center;

          padding: 0 4px;

          border-radius: 999px;

          background: #a7656d;

          color: #fff;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;
          font-weight: 700;
        }

        /* =========================================
           FONDO
        ========================================= */

        .alteza-image-stream__background {
          position: absolute;
          inset: 0;

          z-index: 0;

          overflow: hidden;

          background:
            radial-gradient(
              ellipse at center 42%,
              rgba(255, 250, 248, 0.9) 0%,
              rgba(250, 238, 235, 0.8) 42%,
              rgba(246, 227, 224, 0.92) 72%,
              rgba(239, 214, 211, 0.98) 100%
            );
        }

        .alteza-image-stream__background::before {
          content: "";

          position: absolute;

          width: 52vw;
          height: 52vw;

          left: 50%;
          top: 44%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            rgba(255, 250, 248, 0.75);

          filter: blur(95px);
        }

        /* =========================================
           STREAM
        ========================================= */

        .alteza-image-stream__rails {
          position: absolute;
          inset: 0;

          z-index: 2;

          perspective: 1200px;

          transform-style: preserve-3d;

          pointer-events: none;
        }

        .alteza-image-stream__rail {
          position: absolute;
          inset: 0;
        }

        .alteza-image-stream__card {
          position: absolute;

          left: 50%;
          top: ${axis}%;

          width: clamp(175px, 14vw, 235px);

          aspect-ratio: 0.68;

          overflow: hidden;

          border-radius: 3px;

          background: #eadcd8;

          box-shadow:
            0 22px 55px rgba(69, 46, 42, 0.14),
            0 5px 16px rgba(69, 46, 42, 0.08);

          transform-origin:
            center center;

          will-change:
            transform,
            opacity;

          backface-visibility: hidden;
        }

        .alteza-image-stream__card--left {
          animation:
            alteza-stream-left ${speed}s
            linear infinite;

          animation-delay:
            var(--delay);
        }

        .alteza-image-stream__card--right {
          animation:
            alteza-stream-right ${speed}s
            linear infinite;

          animation-delay:
            var(--delay);
        }

        .alteza-image-stream__image {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
          object-position: center;

          user-select: none;

          -webkit-user-drag: none;
        }

        .alteza-image-stream__card::after {
          content: "";

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.04),
              rgba(60, 38, 35, 0.08)
            );

          pointer-events: none;
        }

        /* =========================================
           SUAVIZADO
        ========================================= */

        .alteza-image-stream__wash {
          position: absolute;
          inset: 0;

          z-index: 8;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(239, 214, 211, 0.98) 0%,
              rgba(246, 227, 224, 0.75) 5%,
              rgba(248, 232, 229, 0) 18%,
              rgba(248, 232, 229, 0) 82%,
              rgba(246, 227, 224, 0.75) 95%,
              rgba(239, 214, 211, 0.98) 100%
            ),
            linear-gradient(
              180deg,
              rgba(248, 235, 232, 0.78) 0%,
              rgba(248, 235, 232, 0) 20%,
              rgba(248, 235, 232, 0) 86%,
              rgba(239, 214, 211, 0.82) 100%
            );
        }

        /* =========================================
           CONTENIDO
        ========================================= */

        .alteza-image-stream__content {
          position: absolute;
          inset: 0;

          z-index: 20;

          display: flex;
          align-items: flex-start;
          justify-content: center;

          padding-top: 145px;

          text-align: center;

          pointer-events: none;
        }

        .alteza-image-stream__content > * {
          pointer-events: auto;
        }

        .alteza-image-stream__content h1 {
          color: #1c1717 !important;

          font-family:
            "Cormorant Garamond",
            Georgia,
            "Times New Roman",
            serif !important;

          font-weight: 500 !important;

          text-shadow: none !important;
        }

        .alteza-image-stream__content p {
          color: #5a4949 !important;
        }

        .alteza-image-stream__content > div {
          position: relative;
        }

        .alteza-image-stream__content > div::after {
          content: "";

          position: absolute;

          left: 50%;
          top: 48%;

          width: 520px;
          height: 230px;

          transform:
            translate(-50%, -50%);

          background:
            rgba(255, 249, 247, 0.54);

          filter: blur(36px);

          z-index: -1;

          pointer-events: none;
        }

        .alteza-image-stream__content p:last-child {
          position: relative;

          z-index: 30;

          display: inline-block;

          margin-top: 145px;

          padding: 10px 26px;

          color: #594747 !important;

          background:
            rgba(255, 247, 245, 0.72);

          backdrop-filter: blur(8px);

          -webkit-backdrop-filter: blur(8px);

          border: 1px solid
            rgba(255, 255, 255, 0.5);

          border-radius: 999px;
        }

        /* =========================================
           ENTRADA A LA COLECCIÓN
        ========================================= */

        .alteza-hero-bottom {
          position: absolute;

          left: 50%;
          bottom: 26px;

          z-index: 30;

          width: min(
            760px,
            calc(100% - 48px)
          );

          transform:
            translateX(-50%);

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 28px;
        }

        .alteza-hero-bottom::before,
        .alteza-hero-bottom::after {
          content: "";

          flex: 1;

          height: 1px;

          background:
            rgba(82, 61, 59, 0.16);
        }

        .alteza-hero-bottom__content {
          display: flex;
          align-items: center;

          gap: 18px;

          white-space: nowrap;
        }

        .alteza-hero-bottom__label {
          color: #665152;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.24em;

          text-transform: uppercase;
        }

        .alteza-hero-bottom__link {
          color: #241b1c;

          text-decoration: none;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          transition: opacity 180ms ease;
        }

        .alteza-hero-bottom__link:hover {
          opacity: 0.55;
        }

        .alteza-hero-bottom__dot {
          width: 3px;
          height: 3px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: #a7656d;
        }

        /* =========================================
           BUSCADOR
        ========================================= */

        .alteza-search {
          position: fixed;

          inset: 0;

          z-index: 9999;

          display: flex;

          align-items: flex-start;
          justify-content: center;

          padding:
            135px
            24px
            40px;

          background:
            rgba(247, 231, 228, 0.78);

          backdrop-filter: blur(22px);

          -webkit-backdrop-filter: blur(22px);

          overflow-y: auto;
        }

        .alteza-search__panel {
          width: min(
            840px,
            100%
          );

          padding: 34px;

          background:
            rgba(255, 250, 248, 0.96);

          border: 1px solid
            rgba(94, 70, 68, 0.12);

          box-shadow:
            0 28px 80px
            rgba(74, 48, 45, 0.12);
        }

        .alteza-search__top {
          display: flex;

          align-items: center;
          justify-content: space-between;

          margin-bottom: 24px;
        }

        .alteza-search__eyebrow {
          color: #9b6a6d;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }

        .alteza-search__close {
          width: 34px;
          height: 34px;

          display: grid;
          place-items: center;

          padding: 0;

          border: 0;

          background: transparent;

          color: #34292a;

          font-size: 28px;
          line-height: 1;

          cursor: pointer;

          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .alteza-search__close:hover {
          opacity: 0.55;

          transform: rotate(5deg);
        }

        .alteza-search__input {
          width: 100%;
          height: 58px;

          padding: 0 18px;

          border: 1px solid
            rgba(80, 60, 58, 0.18);

          outline: none;

          background:
            rgba(255, 255, 255, 0.7);

          color: #21191a;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 15px;

          letter-spacing: 0.03em;

          transition:
            border-color 180ms ease,
            background 180ms ease;
        }

        .alteza-search__input:focus {
          border-color:
            rgba(167, 101, 109, 0.6);

          background:
            rgba(255, 255, 255, 0.92);
        }

        .alteza-search__results {
          margin-top: 24px;
        }

        .alteza-search__results-title {
          margin-bottom: 12px;

          color: #786365;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.18em;

          text-transform: uppercase;
        }

        .alteza-search__result {
          width: 100%;

          display: grid;
          grid-template-columns:
            70px 1fr auto;

          align-items: center;

          gap: 16px;

          padding: 12px 0;

          border: 0;

          border-bottom:
            1px solid
            rgba(80, 60, 58, 0.1);

          background: transparent;

          color: #2b2021;

          text-decoration: none;

          text-align: left;

          cursor: pointer;

          transition:
            padding-left 180ms ease,
            background 180ms ease;
        }

        .alteza-search__result:hover {
          padding-left: 8px;

          background:
            rgba(247, 231, 228, 0.35);
        }

        .alteza-search__result-media {
          width: 70px;
          height: 82px;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              #f1d8d5,
              #d49da0
            );
        }

        .alteza-search__result-image {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .alteza-search__result-placeholder {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 8px;

          text-align: center;

          color: #fff;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 11px;

          line-height: 1.15;

          background:
            linear-gradient(
              145deg,
              #edd0cd,
              #b77980
            );
        }

        .alteza-search__result-info {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .alteza-search__result-name {
          overflow: hidden;

          color: #2b2021;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 21px;

          line-height: 1.1;

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .alteza-search__result-category {
          color: #a7656d;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.15em;

          text-transform: uppercase;
        }

        .alteza-search__result-price {
          color: #78696a;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 11px;
          font-weight: 600;
        }

        .alteza-search__result-arrow {
          color: #a7656d;

          font-size: 18px;

          transition:
            transform 180ms ease;
        }

        .alteza-search__result:hover
        .alteza-search__result-arrow {
          transform:
            translateX(4px);
        }

        .alteza-search__empty {
          padding: 22px 0;

          color: #78696a;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 13px;

          line-height: 1.6;
        }

        /* =========================================
           ANIMACIÓN
        ========================================= */

        @keyframes alteza-stream-left {

          0% {
            opacity: 0;

            transform:
              translate3d(
                -50%,
                -50%,
                -180px
              )
              scale(0.18)
              rotateZ(0deg);
          }

          10% {
            opacity: 0.82;
          }

          24% {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(0.46)
              rotateZ(-3deg);
          }

          48% {
            opacity: 1;

            transform:
              translate3d(
                calc(-50% - 13vw),
                -50%,
                60px
              )
              scale(0.68)
              rotateZ(-7deg);
          }

          72% {
            opacity: 0.96;

            transform:
              translate3d(
                calc(-50% - 31vw),
                -50%,
                100px
              )
              scale(0.9)
              rotateZ(-13deg);
          }

          90% {
            opacity: 0.62;
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                calc(-50% - 53vw),
                -50%,
                130px
              )
              scale(1.08)
              rotateZ(-19deg);
          }
        }

        @keyframes alteza-stream-right {

          0% {
            opacity: 0;

            transform:
              translate3d(
                -50%,
                -50%,
                -180px
              )
              scale(0.18)
              rotateZ(0deg);
          }

          10% {
            opacity: 0.82;
          }

          24% {
            opacity: 1;

            transform:
              translate3d(
                -50%,
                -50%,
                0
              )
              scale(0.46)
              rotateZ(3deg);
          }

          48% {
            opacity: 1;

            transform:
              translate3d(
                calc(-50% + 13vw),
                -50%,
                60px
              )
              scale(0.68)
              rotateZ(7deg);
          }

          72% {
            opacity: 0.96;

            transform:
              translate3d(
                calc(-50% + 31vw),
                -50%,
                100px
              )
              scale(0.9)
              rotateZ(13deg);
          }

          90% {
            opacity: 0.62;
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                calc(-50% + 53vw),
                -50%,
                130px
              )
              scale(1.08)
              rotateZ(19deg);
          }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 900px) {

          .alteza-image-stream {
            height: 720px;
            min-height: 600px;
          }

          .alteza-hero-nav {
            height: 92px;

            grid-template-columns:
              auto 1fr auto;

            padding: 0 22px;

            gap: 18px;
          }

          .alteza-hero-nav__logo {
            font-size: 39px;
          }

          .alteza-hero-nav__links {
            gap: 16px;
          }

          .alteza-hero-nav__link:nth-child(n + 5) {
            display: none;
          }

          .alteza-hero-nav__actions {
            gap: 10px;
          }

          .alteza-image-stream__card {
            width: 155px;
          }

          .alteza-image-stream__content {
            padding-top: 126px;
          }

          .alteza-hero-bottom {
            width:
              min(
                640px,
                calc(100% - 40px)
              );

            bottom: 22px;

            gap: 18px;
          }

          .alteza-hero-bottom__content {
            gap: 12px;
          }

          .alteza-search {
            padding:
              110px
              18px
              30px;
          }

          .alteza-search__panel {
            padding: 26px;
          }
        }

        @media (max-width: 640px) {

          .alteza-image-stream {
            height: 560px;
            min-height: 560px;
          }

          .alteza-hero-nav {
            height: 82px;
            padding: 0 16px;
          }

          .alteza-hero-nav__badge {
            width: 78px;
            min-height: 50px;
            padding: 6px 8px;
          }

          .alteza-hero-nav__badge-name {
            font-size: 21px;
          }

          .alteza-hero-nav__badge-subtitle {
            margin-top: 5px;
            font-size: 4.5px;
          }

          .alteza-hero-nav__links {
            display: none;
          }

          .alteza-hero-nav__actions {
            gap: 6px;
          }

          .alteza-hero-nav__action:nth-child(2) {
            display: none;
          }

          .alteza-image-stream__card {
            width: 125px;
            top: 63%;
          }

          .alteza-image-stream__content {
            padding-top: 112px;
            padding-inline: 14px;
          }

          .alteza-image-stream__content > div {
            width: min(100%, 365px);
            margin-inline: auto;
          }

          .alteza-image-stream__content h1 {
            max-width: 100%;
            font-size: clamp(44px, 13vw, 58px) !important;
            letter-spacing: 0.08em !important;
          }

          .alteza-image-stream__content p {
            max-width: 100%;
            overflow-wrap: break-word;
          }

          .alteza-image-stream__content p:first-child {
            font-size: 8px !important;
            letter-spacing: 0.28em !important;
          }

          .alteza-image-stream__content p:nth-of-type(2) {
            margin-inline: auto;
            font-size: 12px !important;
            line-height: 1.7;
          }

          .alteza-image-stream__content p:last-child {
            margin-top: 116px;
            padding: 9px 18px;
            max-width: calc(100vw - 40px);
          }

          .alteza-image-stream__content > div::after {
            width: 320px;
            height: 170px;
          }

          .alteza-image-stream__wash {
            background:
              linear-gradient(
                90deg,
                rgba(239, 214, 211, 0.94) 0%,
                rgba(239, 214, 211, 0) 13%,
                rgba(239, 214, 211, 0) 87%,
                rgba(239, 214, 211, 0.94) 100%
              ),
              linear-gradient(
                180deg,
                rgba(248, 235, 232, 0.92) 0%,
                rgba(248, 235, 232, 0) 18%,
                rgba(248, 235, 232, 0) 84%,
                rgba(239, 214, 211, 0.9) 100%
              );
          }

          .alteza-hero-bottom {
            width:
              calc(100% - 28px);

            bottom: 18px;

            gap: 10px;
          }

          .alteza-hero-bottom__label {
            display: none;
          }

          .alteza-hero-bottom__content {
            gap: 10px;
          }

          .alteza-hero-bottom__link {
            font-size: 9px;

            letter-spacing: 0.14em;
          }

          .alteza-search {
            padding:
              88px
              12px
              20px;
          }

          .alteza-search__panel {
            padding: 20px;
          }

          .alteza-search__input {
            height: 54px;
          }

          .alteza-search__result {
            grid-template-columns:
              58px
              1fr
              auto;

            gap: 12px;
          }

          .alteza-search__result-media {
            width: 58px;
            height: 70px;
          }

          .alteza-search__result-name {
            font-size: 17px;
          }

          .alteza-search__result-category {
            font-size: 8px;
          }

          .alteza-search__result-price {
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .alteza-image-stream__card {
            animation-play-state: paused;
          }
        }
      `}</style>

      <section
        className={`alteza-image-stream ${className}`}
      >
        {/* =========================================
            NAVEGACIÓN
        ========================================= */}

        <header className="alteza-hero-nav">
          <a
            className="alteza-hero-nav__badge"
            href="/"
            aria-label="Alteza — inicio"
          >
            <span className="alteza-hero-nav__badge-name">
              ALTEZA
            </span>

            <span className="alteza-hero-nav__badge-subtitle">
              BEAUTY HOUSE
            </span>
          </a>

          <nav
            className="alteza-hero-nav__links"
            aria-label="Navegación principal"
          >
            <a
              className="alteza-hero-nav__link"
              href="/"
            >
              Inicio
            </a>

            <a
              className="alteza-hero-nav__link"
              href="/tienda"
            >
              Tienda
            </a>

            <a
              className="alteza-hero-nav__link"
              href="/tienda?categoria=Maquillaje"
            >
              Maquillaje
            </a>

            <a
              className="alteza-hero-nav__link"
              href="/tienda?categoria=Skincare"
            >
              Skincare
            </a>

            <a
              className="alteza-hero-nav__link"
              href="/tienda?categoria=Cuidado%20capilar"
            >
              Cabello
            </a>

            <a
              className="alteza-hero-nav__link"
              href="/tienda?categoria=Accesorios"
            >
              Accesorios
            </a>
          </nav>

          <div className="alteza-hero-nav__actions">
            {/* BUSCAR */}

            <button
              className="alteza-hero-nav__action"
              type="button"
              aria-label="Buscar"
              onClick={() =>
                setSearchOpen(true)
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path d="m16 16 4 4" />
              </svg>
            </button>

            {/* CUENTA */}

            <button
              className="alteza-hero-nav__action"
              type="button"
              aria-label="Mi cuenta"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3.2"
                />

                <path
                  d="M5 20c.9-4 3.1-6 7-6s6.1 2 7 6"
                />
              </svg>
            </button>

            {/* FAVORITOS */}

            <button
              className="alteza-hero-nav__action"
              type="button"
              aria-label="Favoritos"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="
                    M20.8 8.8
                    c0 5-8.8 10.2-8.8 10.2
                    S3.2 13.8 3.2 8.8
                    A4.6 4.6 0 0 1 12 6.1
                    a4.6 4.6 0 0 1 8.8 2.7Z
                  "
                />
              </svg>
            </button>

            {/* CARRITO */}

            <button
              className="alteza-hero-nav__action"
              type="button"
              aria-label="Carrito"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 5h2l1.5 10h9.8L19 8H7" />

                <circle
                  cx="10"
                  cy="19"
                  r="1"
                />

                <circle
                  cx="17"
                  cy="19"
                  r="1"
                />
              </svg>

              <span className="alteza-hero-nav__cart-count">
                0
              </span>
            </button>
          </div>
        </header>

        {/* =========================================
            FONDO
        ========================================= */}

        <div
          className="alteza-image-stream__background"
        />

        {/* =========================================
            STREAM DE IMÁGENES
        ========================================= */}

        <div
          className="alteza-image-stream__rails"
        >
          <div
            className="alteza-image-stream__rail"
          >
            {leftCards.map(
              (image, index) => (
                <figure
                  key={`left-${index}`}
                  className="
                    alteza-image-stream__card
                    alteza-image-stream__card--left
                  "
                  style={
                    {
                      "--delay":
                        `${
                          -index *
                          (speed / cards)
                        }s`,
                    } as React.CSSProperties
                  }
                >
                  <img
                    className="
                      alteza-image-stream__image
                    "
                    src={image.src}
                    alt={image.alt}
                  />
                </figure>
              )
            )}
          </div>

          <div
            className="alteza-image-stream__rail"
          >
            {rightCards.map(
              (image, index) => (
                <figure
                  key={`right-${index}`}
                  className="
                    alteza-image-stream__card
                    alteza-image-stream__card--right
                  "
                  style={
                    {
                      "--delay":
                        `${
                          -(
                            index *
                              (speed / cards) +
                            speed / 2
                          )
                        }s`,
                    } as React.CSSProperties
                  }
                >
                  <img
                    className="
                      alteza-image-stream__image
                    "
                    src={image.src}
                    alt={image.alt}
                  />
                </figure>
              )
            )}
          </div>
        </div>

        <div
          className="alteza-image-stream__wash"
        />

        {/* =========================================
            CONTENIDO CENTRAL
        ========================================= */}

        <div
          className="
            alteza-image-stream__content
          "
        >
          {children}
        </div>

        {/* =========================================
            BUSCADOR
        ========================================= */}

        {searchOpen && (
          <div
            className="alteza-search"
            role="dialog"
            aria-modal="true"
            aria-label="Buscar productos"
            onClick={closeSearch}
          >
            <div
              className="alteza-search__panel"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div
                className="alteza-search__top"
              >
                <span
                  className="
                    alteza-search__eyebrow
                  "
                >
                  Buscar en Alteza
                </span>

                <button
                  className="
                    alteza-search__close
                  "
                  type="button"
                  aria-label="Cerrar búsqueda"
                  onClick={closeSearch}
                >
                  ×
                </button>
              </div>

              <input
                className="
                  alteza-search__input
                "
                type="search"
                placeholder="¿Qué estás buscando?"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                autoFocus
              />

              <div
                className="
                  alteza-search__results
                "
              >
                <p
                  className="
                    alteza-search__results-title
                  "
                >
                  {searchTerm
                    ? "Resultados"
                    : "Productos destacados"}
                </p>

                {searchResults.length > 0 ? (
                  searchResults.map(
                    (product: Product) => (
                      <a
                        key={product.name}
                        className="alteza-search__result"
                        href={`/producto/${createProductSlug(product.name)}`}
                        onClick={closeSearch}
                      >
                        <span
                          className="
                            alteza-search__result-media
                          "
                        >
                          {product.image ? (
                            <img
                              className="
                                alteza-search__result-image
                              "
                              src={product.image}
                              alt={product.name}
                            />
                          ) : (
                            <span
                              className="
                                alteza-search__result-placeholder
                              "
                            >
                              ALTEZA
                            </span>
                          )}
                        </span>

                        <span
                          className="
                            alteza-search__result-info
                          "
                        >
                          <span
                            className="
                              alteza-search__result-name
                            "
                          >
                            {product.name}
                          </span>

                          <span
                            className="
                              alteza-search__result-category
                            "
                          >
                            {product.category}
                          </span>

                          <span
                            className="
                              alteza-search__result-price
                            "
                          >
                            {product.price}
                          </span>
                        </span>

                        <span
                          className="
                            alteza-search__result-arrow
                          "
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </a>
                    )
                  )
                ) : (
                  <p
                    className="
                      alteza-search__empty
                    "
                  >
                    No encontramos productos
                    relacionados con tu búsqueda.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            PARTE INFERIOR DEL HERO
        ========================================= */}

        <div
          className="alteza-hero-bottom"
        >
          <div
            className="
              alteza-hero-bottom__content
            "
          >
            <span
              className="
                alteza-hero-bottom__label
              "
            >
              Nueva colección
            </span>

            <span
              className="
                alteza-hero-bottom__dot
              "
            />

            <a
              className="
                alteza-hero-bottom__link
              "
              href="/tienda"
            >
              Explorar colección →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ImageStreamHero;