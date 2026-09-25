import React, { useId } from "react";

type GlowButtonProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?:
    | React.MouseEventHandler<HTMLAnchorElement>
    | React.MouseEventHandler<HTMLButtonElement>;
};

export function GlowButton({
  children,
  className = "",
  tone = "dark",
  href,
  type = "button",
  disabled = false,
  onClick,
}: GlowButtonProps) {
  const id = useId().replace(/:/g, "");

  const isLight = tone === "light";

  const buttonClassName = [
    "alteza-glow-button",
    isLight ? "alteza-glow-button--light" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="alteza-glow-button__shine" />

      <span className="alteza-glow-button__content">
        {children}
      </span>
    </>
  );

  const styles = (
    <style>{`
      @keyframes alteza-button-shine-${id} {
        0% {
          transform:
            translateX(-140%)
            skewX(-18deg);
          opacity: 0;
        }

        20% {
          opacity: 0.2;
        }

        45% {
          opacity: 0.7;
        }

        70% {
          opacity: 0;
        }

        100% {
          transform:
            translateX(180%)
            skewX(-18deg);
          opacity: 0;
        }
      }

      .alteza-glow-button {
        position: relative;
        isolation: isolate;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        min-height: 48px;
        padding: 0 28px;

        overflow: hidden;

        border: 1px solid
          rgba(255, 255, 255, 0.55);

        border-radius: 999px;

        background:
          linear-gradient(
            135deg,
            #dfb4b5 0%,
            #cf979c 48%,
            #d79b9e 100%
          );

        color: #2b2021;

        font-family:
          "Montserrat",
          Arial,
          Helvetica,
          sans-serif;

        font-size: 9px;
        font-weight: 600;

        letter-spacing: 0.16em;
        text-transform: uppercase;

        text-decoration: none;

        cursor: pointer;

        box-shadow:
          0 10px 28px
            rgba(126, 78, 82, 0.14),
          inset 0 1px 0
            rgba(255, 255, 255, 0.55);

        transition:
          transform 220ms ease,
          box-shadow 220ms ease,
          background 220ms ease;
      }

      .alteza-glow-button::before {
        content: "";

        position: absolute;
        inset: -3px;

        z-index: -2;

        border-radius: inherit;

        background:
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 247, 245, 0.8),
            rgba(255, 255, 255, 0)
          );

        filter: blur(9px);

        opacity: 0.38;

        transition:
          opacity 220ms ease;
      }

      .alteza-glow-button__shine {
        position: absolute;

        top: -60%;
        bottom: -60%;
        left: -30%;

        width: 25%;

        z-index: 0;

        background:
          linear-gradient(
            90deg,
            transparent,
            rgba(255, 250, 248, 0.95),
            transparent
          );

        filter: blur(4px);

        transform: skewX(-18deg);

        opacity: 0;

        pointer-events: none;
      }

      .alteza-glow-button__content {
        position: relative;
        z-index: 2;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        gap: 8px;

        white-space: nowrap;
      }

      .alteza-glow-button:hover {
        transform: translateY(-2px);

        background:
          linear-gradient(
            135deg,
            #cd969b 0%,
            #b97880 50%,
            #c98b90 100%
          );

        color: #ffffff;

        box-shadow:
          0 14px 34px
            rgba(126, 78, 82, 0.21),
          0 0 0 1px
            rgba(255, 255, 255, 0.2),
          inset 0 1px 0
            rgba(255, 255, 255, 0.6);
      }

      .alteza-glow-button:hover::before {
        opacity: 0.85;
      }

      .alteza-glow-button:hover
      .alteza-glow-button__shine {
        animation:
          alteza-button-shine-${id}
          900ms
          ease
          forwards;
      }

      .alteza-glow-button:active {
        transform: translateY(0);
      }

      .alteza-glow-button:disabled {
        cursor: not-allowed;
        opacity: 0.65;
      }

      .alteza-glow-button--light {
        border-color:
          rgba(255, 255, 255, 0.85);

        background:
          linear-gradient(
            135deg,
            #fffaf8 0%,
            #f5e5e2 50%,
            #fffaf8 100%
          );

        color: #2a2021;

        box-shadow:
          0 10px 26px
            rgba(88, 57, 56, 0.08),
          inset 0 1px 0
            rgba(255, 255, 255, 0.9);
      }

      .alteza-glow-button--light:hover {
        background:
          linear-gradient(
            135deg,
            #f7dfdc 0%,
            #e7b9ba 50%,
            #f7dfdc 100%
          );

        color: #2a2021;
      }

      @media (max-width: 600px) {
        .alteza-glow-button {
          min-height: 46px;
          padding: 0 22px;

          font-size: 8px;
          letter-spacing: 0.14em;
        }
      }
    `}</style>
  );

  if (href) {
    return (
      <>
        {styles}

        <a
          href={href}
          className={buttonClassName}
          onClick={
            onClick as React.MouseEventHandler<HTMLAnchorElement>
          }
        >
          {content}
        </a>
      </>
    );
  }

  return (
    <>
      {styles}

      <button
        type={type}
        className={buttonClassName}
        disabled={disabled}
        onClick={
          onClick as React.MouseEventHandler<HTMLButtonElement>
        }
      >
        {content}
      </button>
    </>
  );
}

export default GlowButton;