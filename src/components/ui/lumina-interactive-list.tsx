import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import gsap from "gsap";

type Slide = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  label: string;
};

const FALLBACK_IMAGE =
  "/images/hero/alteza-hero.webp";

const slides: Slide[] = [
  {
    id: "beauty",
    number: "01",
    eyebrow: "ALTEZA BEAUTY",
    title: "Belleza",
    accent: "que te eleva.",
    description:
      "Una nueva expresión de belleza pensada para celebrar tu estilo, tu esencia y cada versión de ti.",
    image:
      "/images/hero/alteza-modelo-01.webp",
    label: "ALTEZA",
  },
  {
    id: "glow",
    number: "02",
    eyebrow: "ALTEZA GLOW",
    title: "Tu belleza",
    accent: "en primer plano.",
    description:
      "Maquillaje, skincare y detalles creados para acompañar tus momentos más especiales.",
    image:
      "/images/hero/alteza-modelo-02.webp",
    label: "GLOW",
  },
  {
    id: "ritual",
    number: "03",
    eyebrow: "ALTEZA RITUAL",
    title: "Cuida",
    accent: "tu momento.",
    description:
      "Texturas, color y cuidado se encuentran en un ritual femenino, elegante y contemporáneo.",
    image:
      "/images/hero/alteza-modelo-03.webp",
    label: "RITUAL",
  },
  {
    id: "signature",
    number: "04",
    eyebrow: "ALTEZA SIGNATURE",
    title: "Tu esencia",
    accent: "se revela.",
    description:
      "Una colección creada para convertir lo cotidiano en una experiencia de belleza extraordinaria.",
    image:
      "/images/hero/alteza-modelo-04.webp",
    label: "SIGNATURE",
  },
];

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;

  uniform float uProgress;
  uniform float uTime;

  uniform vec2 uResolution;
  uniform vec2 uTexture1Size;
  uniform vec2 uTexture2Size;

  varying vec2 vUv;

  vec2 coverUV(
    vec2 uv,
    vec2 textureSize
  ) {
    vec2 ratio =
      uResolution / textureSize;

    float scale =
      max(ratio.x, ratio.y);

    vec2 scaledSize =
      textureSize * scale;

    vec2 offset =
      (uResolution - scaledSize) * 0.5;

    return (
      uv * uResolution - offset
    ) / scaledSize;
  }

  void main() {

    vec2 uv1 =
      coverUV(
        vUv,
        uTexture1Size
      );

    vec2 uv2 =
      coverUV(
        vUv,
        uTexture2Size
      );

    vec2 center =
      vec2(0.5, 0.52);

    vec2 direction =
      vUv - center;

    float distanceFromCenter =
      length(direction);

    float revealRadius =
      mix(
        0.015,
        0.92,
        uProgress
      );

    float reveal =
      smoothstep(
        revealRadius + 0.16,
        revealRadius - 0.16,
        distanceFromCenter
      );

    float wave =
      sin(
        distanceFromCenter * 20.0 -
        uTime * 2.2
      );

    float distortion =
      wave *
      0.010 *
      smoothstep(
        0.2,
        0.9,
        uProgress
      );

    vec2 directionSafe =
      normalize(
        direction + vec2(0.0001)
      );

    vec2 distortedUV =
      uv2 -
      directionSafe *
      distortion *
      reveal;

    float chromatic =
      0.0025 *
      reveal;

    vec4 incoming =
      vec4(
        texture2D(
          uTexture2,
          distortedUV +
            directionSafe *
            chromatic
        ).r,

        texture2D(
          uTexture2,
          distortedUV
        ).g,

        texture2D(
          uTexture2,
          distortedUV -
            directionSafe *
            chromatic
        ).b,

        1.0
      );

    vec4 outgoing =
      texture2D(
        uTexture1,
        uv1
      );

    float glow =
      smoothstep(
        0.72,
        1.0,
        distanceFromCenter
      ) *
      uProgress *
      0.045;

    incoming.rgb += glow;

    vec4 result =
      mix(
        outgoing,
        incoming,
        reveal
      );

    float finalBlend =
      smoothstep(
        0.9,
        1.0,
        uProgress
      );

    result =
      mix(
        result,
        texture2D(
          uTexture2,
          uv2
        ),
        finalBlend
      );

    gl_FragColor =
      result;
  }
`;

export function Component() {
  const heroRef =
    useRef<HTMLElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null
    );

  const rendererRef =
    useRef<THREE.WebGLRenderer | null>(
      null
    );

  const materialRef =
    useRef<THREE.ShaderMaterial | null>(
      null
    );

  const texturesRef =
    useRef<THREE.Texture[]>([]);

  const animationFrameRef =
    useRef<number | null>(null);

  const progressTweenRef =
    useRef<gsap.core.Tween | null>(
      null
    );

  const transitionTweenRef =
    useRef<gsap.core.Tween | null>(
      null
    );

  const currentRef =
    useRef(0);

  const transitionRef =
    useRef(false);

  const progressRefs =
    useRef<
      (HTMLSpanElement | null)[]
    >([]);

  const [current, setCurrent] =
    useState(0);

  const activeSlide =
    slides[current];

  const transitionDuration = 2.2;
  const slideDuration = 5.5;

  const updateProgressBars =
    useCallback(
      (index: number) => {
        progressRefs.current.forEach(
          (bar, barIndex) => {
            if (!bar) return;

            gsap.set(bar, {
              width:
                barIndex < index
                  ? "100%"
                  : "0%",
            });
          }
        );
      },
      []
    );

  const startAutoplay =
    useCallback(() => {
      progressTweenRef.current?.kill();

      updateProgressBars(
        currentRef.current
      );

      const activeBar =
        progressRefs.current[
          currentRef.current
        ];

      if (!activeBar) return;

      progressTweenRef.current =
        gsap.to(activeBar, {
          width: "100%",
          duration: slideDuration,
          ease: "none",
          onComplete: () => {
            const nextIndex =
              (currentRef.current + 1) %
              slides.length;

            goToSlide(nextIndex);
          },
        });
    }, [updateProgressBars]);

  const animateTextOut = () => {
    gsap.to(
      ".alteza-editorial-hero__copy > *",
      {
        opacity: 0,
        y: -18,
        duration: 0.38,
        stagger: 0.025,
        ease: "power2.in",
      }
    );
  };

  const animateTextIn = () => {
    gsap.fromTo(
      ".alteza-editorial-hero__copy > *",
      {
        opacity: 0,
        y: 26,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.075,
        ease: "power3.out",
      }
    );
  };

  const goToSlide = (
    nextIndex: number
  ) => {
    if (
      nextIndex < 0 ||
      nextIndex >= slides.length
    ) {
      return;
    }

    if (
      transitionRef.current ||
      nextIndex === currentRef.current
    ) {
      return;
    }

    const material =
      materialRef.current;

    const textures =
      texturesRef.current;

    if (
      !material ||
      textures.length <
        slides.length
    ) {
      return;
    }

    transitionRef.current = true;

    progressTweenRef.current?.kill();
    transitionTweenRef.current?.kill();

    const currentIndex =
      currentRef.current;

    const currentTexture =
      textures[currentIndex];

    const nextTexture =
      textures[nextIndex];

    material.uniforms.uTexture1.value =
      currentTexture;

    material.uniforms.uTexture2.value =
      nextTexture;

    material.uniforms.uTexture1Size.value =
      new THREE.Vector2(
        currentTexture.userData.width,
        currentTexture.userData.height
      );

    material.uniforms.uTexture2Size.value =
      new THREE.Vector2(
        nextTexture.userData.width,
        nextTexture.userData.height
      );

    animateTextOut();

    gsap.delayedCall(
      0.55,
      () => {
        currentRef.current =
          nextIndex;

        setCurrent(nextIndex);

        requestAnimationFrame(
          animateTextIn
        );
      }
    );

    transitionTweenRef.current =
      gsap.fromTo(
        material.uniforms.uProgress,
        {
          value: 0,
        },
        {
          value: 1,
          duration:
            transitionDuration,
          ease: "power2.inOut",
          onUpdate: () => {
            const progress =
              material.uniforms
                .uProgress.value;

            if (
              material.uniforms.uTime
            ) {
              material.uniforms.uTime.value =
                progress * 4;
            }
          },
          onComplete: () => {
            material.uniforms.uProgress.value =
              0;

            material.uniforms.uTexture1.value =
              nextTexture;

            material.uniforms.uTexture1Size.value =
              new THREE.Vector2(
                nextTexture.userData.width,
                nextTexture.userData.height
              );

            transitionRef.current =
              false;

            startAutoplay();
          },
        }
      );
  };

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const hero =
      heroRef.current;

    if (!canvas || !hero) {
      return;
    }

    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
      });

    rendererRef.current =
      renderer;

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    const scene =
      new THREE.Scene();

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      );

    const material =
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: {
            value: null,
          },

          uTexture2: {
            value: null,
          },

          uProgress: {
            value: 0,
          },

          uTime: {
            value: 0,
          },

          uResolution: {
            value:
              new THREE.Vector2(
                1,
                1
              ),
          },

          uTexture1Size: {
            value:
              new THREE.Vector2(
                1,
                1
              ),
          },

          uTexture2Size: {
            value:
              new THREE.Vector2(
                1,
                1
              ),
          },
        },

        vertexShader,

        fragmentShader,
      });

    materialRef.current =
      material;

    const geometry =
      new THREE.PlaneGeometry(
        2,
        2
      );

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    scene.add(mesh);

    const resize =
      () => {
        const width =
          hero.clientWidth;

        const height =
          hero.clientHeight;

        renderer.setSize(
          width,
          height,
          false
        );

        material.uniforms.uResolution.value.set(
          width,
          height
        );
      };

    resize();

    const loader =
      new THREE.TextureLoader();

    const loadTexture =
      (
        src: string
      ) =>
        new Promise<THREE.Texture>(
          (resolve) => {
            loader.load(
              src,
              (texture) => {
                texture.minFilter =
                  THREE.LinearFilter;

                texture.magFilter =
                  THREE.LinearFilter;

                const image =
                  texture.image as
                    HTMLImageElement;

                texture.userData = {
                  width:
                    image.naturalWidth ||
                    image.width,

                  height:
                    image.naturalHeight ||
                    image.height,
                };

                if (
                  "colorSpace" in
                  texture
                ) {
                  texture.colorSpace =
                    THREE.SRGBColorSpace;
                }

                resolve(
                  texture
                );
              },
              undefined,
              () => {
                if (
                  src ===
                  FALLBACK_IMAGE
                ) {
                  const fallback =
                    loader.load(
                      FALLBACK_IMAGE
                    );

                  fallback.minFilter =
                    THREE.LinearFilter;

                  fallback.magFilter =
                    THREE.LinearFilter;

                  const image =
                    fallback.image as
                      HTMLImageElement;

                  fallback.userData = {
                    width:
                      image?.naturalWidth ||
                      image?.width ||
                      1920,

                    height:
                      image?.naturalHeight ||
                      image?.height ||
                      1080,
                  };

                  resolve(
                    fallback
                  );

                  return;
                }

                loadTexture(
                  FALLBACK_IMAGE
                ).then(
                  resolve
                );
              }
            );
          }
        );

    Promise.all(
      slides.map(
        (slide) =>
          loadTexture(
            slide.image
          )
      )
    ).then(
      (textures) => {
        texturesRef.current =
          textures;

        material.uniforms.uTexture1.value =
          textures[0];

        material.uniforms.uTexture2.value =
          textures[1];

        material.uniforms.uTexture1Size.value =
          new THREE.Vector2(
            textures[0].userData.width,
            textures[0].userData.height
          );

        material.uniforms.uTexture2Size.value =
          new THREE.Vector2(
            textures[1].userData.width,
            textures[1].userData.height
          );

        startAutoplay();
      }
    );

    const render =
      () => {
        animationFrameRef.current =
          requestAnimationFrame(
            render
          );

        material.uniforms.uTime.value +=
          0.01;

        renderer.render(
          scene,
          camera
        );
      };

    render();

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      progressTweenRef.current?.kill();
      transitionTweenRef.current?.kill();

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      window.removeEventListener(
        "resize",
        resize
      );

      geometry.dispose();
      material.dispose();

      texturesRef.current.forEach(
        (texture) =>
          texture.dispose()
      );

      renderer.dispose();
    };
  }, [startAutoplay]);

  useEffect(() => {
    const hero =
      heroRef.current;

    const canvas =
      canvasRef.current;

    if (!hero || !canvas) {
      return;
    }

    const handleMove =
      (event: MouseEvent) => {
        const rect =
          hero.getBoundingClientRect();

        const x =
          (
            event.clientX -
            rect.left
          ) /
            rect.width -
          0.5;

        const y =
          (
            event.clientY -
            rect.top
          ) /
            rect.height -
          0.5;

        gsap.to(canvas, {
          x: x * 5,
          y: y * 3,
          scale: 1.01,
          duration: 1.2,
          ease: "power3.out",
          overwrite: true,
        });
      };

    const handleLeave =
      () => {
        gsap.to(canvas, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        });
      };

    hero.addEventListener(
      "mousemove",
      handleMove
    );

    hero.addEventListener(
      "mouseleave",
      handleLeave
    );

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMove
      );

      hero.removeEventListener(
        "mouseleave",
        handleLeave
      );
    };
  }, []);

  return (
    <>
      <style>{`
        .alteza-editorial-hero {
          position: relative;
          width: 100%;
          height: calc(100vh - 120px);
          min-height: 680px;
          overflow: hidden;
          isolation: isolate;
          background: #d9aaa7;
          color: #ffffff;
        }

        .alteza-editorial-hero__canvas {
          position: absolute;
          inset: -5px;
          width: calc(100% + 10px);
          height: calc(100% + 10px);
          display: block;
          z-index: 0;
        }

        .alteza-editorial-hero__veil {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;

          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(122, 67, 72, 0.14) 0%,
              rgba(122, 67, 72, 0.04) 34%,
              rgba(40, 20, 22, 0.12) 100%
            );

          mix-blend-mode: multiply;
        }

        .alteza-editorial-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;

          background:
            linear-gradient(
              to bottom,
              rgba(20, 10, 12, 0.10),
              transparent 18%,
              transparent 80%,
              rgba(20, 10, 12, 0.12)
            );
        }

        .alteza-editorial-hero__content {
          position: relative;
          z-index: 8;

          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          text-align: center;
          pointer-events: none;
        }

        .alteza-editorial-hero__copy {
          width: min(980px, 92%);
          padding-bottom: 20px;
          pointer-events: auto;
        }

        .alteza-editorial-hero__eyebrow {
          margin: 0 0 22px;

          color: rgba(255, 255, 255, 0.82);

          font-family: Montserrat, sans-serif;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 0.34em;

          text-transform: uppercase;
        }

        .alteza-editorial-hero__title {
          margin: 0;

          color: #ffffff;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(
              84px,
              11vw,
              158px
            );

          font-weight: 500;

          line-height: 0.76;

          letter-spacing: -0.065em;

          text-shadow:
            0 5px 30px
            rgba(36, 18, 21, 0.18);
        }

        .alteza-editorial-hero__title-main,
        .alteza-editorial-hero__title-accent {
          display: block;
        }

        .alteza-editorial-hero__title-accent {
          color: #fae5e2;
          font-style: italic;
        }

        .alteza-editorial-hero__description {
          width: min(500px, 90%);

          margin: 34px auto 0;

          color:
            rgba(
              255,
              255,
              255,
              0.88
            );

          font-family: Montserrat, sans-serif;

          font-size: 13px;

          line-height: 1.85;

          text-shadow:
            0 2px 14px
            rgba(30, 12, 15, 0.15);
        }

        .alteza-editorial-hero__actions {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 28px;

          margin-top: 32px;
        }

        .alteza-editorial-hero__button {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: 170px;
          min-height: 50px;

          padding: 0 28px;

          background: #181616;
          color: #ffffff;

          font-family: Montserrat, sans-serif;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 0.16em;

          text-decoration: none;

          text-transform: uppercase;

          transition:
            transform 240ms ease,
            background 240ms ease;
        }

        .alteza-editorial-hero__button:hover {
          background: #9b5c63;
          transform: translateY(-2px);
        }

        .alteza-editorial-hero__link {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          color: #ffffff;

          font-family: Montserrat, sans-serif;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 0.12em;

          text-decoration: none;

          text-transform: uppercase;
        }

        .alteza-editorial-hero__link span {
          font-size: 18px;

          transition:
            transform 240ms ease;
        }

        .alteza-editorial-hero__link:hover span {
          transform:
            translateX(5px);
        }

        .alteza-editorial-hero__brand {
          position: absolute;

          top: 30px;
          left: 38px;

          z-index: 10;

          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 18px;

          letter-spacing: 0.20em;
        }

        .alteza-editorial-hero__counter {
          position: absolute;

          top: 50%;
          right: 38px;

          z-index: 10;

          transform:
            translateY(-50%);

          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 27px;

          line-height: 1;
        }

        .alteza-editorial-hero__counter-total {
          color:
            rgba(
              255,
              255,
              255,
              0.46
            );
        }

        .alteza-editorial-hero__navigation {
          position: absolute;

          left: 50%;
          bottom: 25px;

          z-index: 12;

          transform:
            translateX(-50%);

          width: min(
            900px,
            calc(100% - 80px)
          );

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 20px;
        }

        .alteza-editorial-hero__nav {
          padding: 0;

          border: 0;

          background: transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-family: Montserrat, sans-serif;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.14em;

          text-align: left;

          text-transform: uppercase;

          cursor: pointer;

          transition:
            color 240ms ease;
        }

        .alteza-editorial-hero__nav:hover,
        .alteza-editorial-hero__nav.is-active {
          color: #ffffff;
        }

        .alteza-editorial-hero__progress {
          display: block;

          width: 100%;
          height: 1px;

          margin-bottom: 7px;

          overflow: hidden;

          background:
            rgba(
              255,
              255,
              255,
              0.20
            );
        }

        .alteza-editorial-hero__progress-fill {
          display: block;

          width: 0;
          height: 100%;

          background: #ffffff;
        }

        @media (max-width: 900px) {
          .alteza-editorial-hero {
            height: 740px;
            min-height: 740px;
          }

          .alteza-editorial-hero__title {
            font-size:
              clamp(
                70px,
                12vw,
                112px
              );
          }

          .alteza-editorial-hero__navigation {
            width:
              calc(100% - 40px);

            gap: 12px;
          }

          .alteza-editorial-hero__brand {
            left: 20px;
            top: 20px;
          }

          .alteza-editorial-hero__counter {
            right: 20px;
          }
        }

        @media (max-width: 600px) {
          .alteza-editorial-hero {
            height: 700px;
            min-height: 700px;
          }

          .alteza-editorial-hero__copy {
            width: 92%;
            padding-bottom: 70px;
          }

          .alteza-editorial-hero__eyebrow {
            font-size: 9px;
            margin-bottom: 18px;
          }

          .alteza-editorial-hero__title {
            font-size:
              clamp(
                58px,
                16vw,
                84px
              );
          }

          .alteza-editorial-hero__description {
            width: 90%;
            font-size: 12px;
          }

          .alteza-editorial-hero__actions {
            flex-direction: column;
            gap: 17px;
          }

          .alteza-editorial-hero__navigation {
            bottom: 15px;

            width:
              calc(100% - 28px);

            grid-template-columns:
              repeat(2, 1fr);

            gap: 10px;
          }

          .alteza-editorial-hero__nav {
            font-size: 8px;
          }

          .alteza-editorial-hero__brand {
            top: 15px;
            left: 16px;
            font-size: 16px;
          }

          .alteza-editorial-hero__counter {
            top: 20px;
            right: 16px;
            transform: none;
            font-size: 23px;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        className="alteza-editorial-hero"
        aria-label="Alteza Beauty"
      >
        <canvas
          ref={canvasRef}
          className="alteza-editorial-hero__canvas"
        />

        <div className="alteza-editorial-hero__veil" />

        <div className="alteza-editorial-hero__brand">
          ALTEZA
        </div>

        <div className="alteza-editorial-hero__counter">
          {activeSlide.number}
          <span className="alteza-editorial-hero__counter-total">
            {" "} / 04
          </span>
        </div>

        <div className="alteza-editorial-hero__content">
          <div className="alteza-editorial-hero__copy">

            <p className="alteza-editorial-hero__eyebrow">
              {activeSlide.eyebrow}
            </p>

            <h1 className="alteza-editorial-hero__title">
              <span className="alteza-editorial-hero__title-main">
                {activeSlide.title}
              </span>

              <span className="alteza-editorial-hero__title-accent">
                {activeSlide.accent}
              </span>
            </h1>

            <p className="alteza-editorial-hero__description">
              {activeSlide.description}
            </p>

            <div className="alteza-editorial-hero__actions">

              <a
                href="#shop"
                className="alteza-editorial-hero__button"
              >
                Comprar ahora
              </a>

              <a
                href="#collections"
                className="alteza-editorial-hero__link"
              >
                Explorar colección
                <span>→</span>
              </a>

            </div>
          </div>
        </div>

        <nav
          className="alteza-editorial-hero__navigation"
          aria-label="Navegación del Hero"
        >
          {slides.map(
            (slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`
                  alteza-editorial-hero__nav
                  ${
                    current === index
                      ? "is-active"
                      : ""
                  }
                `}
                onClick={() =>
                  goToSlide(index)
                }
              >
                <span className="alteza-editorial-hero__progress">
                  <span
                    ref={(element) => {
                      progressRefs.current[
                        index
                      ] = element;
                    }}
                    data-index={index}
                    className="alteza-editorial-hero__progress-fill"
                  />
                </span>

                {slide.number}{" "}
                —{" "}
                {slide.label}
              </button>
            )
          )}
        </nav>
      </section>
    </>
  );
}

export default Component;