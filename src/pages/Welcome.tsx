import React from "react";
import classes from "./Welcome.module.css";
import { useLoginContext } from "hooks/Login";
import { Redirect } from "react-router-dom";

const LogoSvg = () => (
  <svg
    className={classes.squiggle}
    width="146"
    height="146"
    viewBox="0 0 146 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <circle
        cx="73"
        cy="69"
        r="69"
        fill="url(#paint0_linear)"
        fill-opacity="0.6"
      />
      <g className={classes.logoRecord} filter="url(#filter1_d)">
        <line
          x1="54.9687"
          y1="49.0289"
          x2="93.127"
          y2="85.8243"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          x1="42.2409"
          y1="77.3388"
          x2="64.8683"
          y2="99.9663"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          x1="83.2531"
          y1="36.3266"
          x2="105.881"
          y2="58.9541"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          x1="58.5045"
          y1="72.3891"
          x2="69.8183"
          y2="83.7028"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          x1="79.0104"
          y1="51.883"
          x2="90.3241"
          y2="63.1967"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M73 138C111.108 138 142 107.108 142 69C142 30.8924 111.108 0 73 0C34.8924 0 4 30.8924 4 69C4 107.108 34.8924 138 73 138ZM73.5 103C92.5538 103 108 87.5538 108 68.5C108 49.4462 92.5538 34 73.5 34C54.4462 34 39 49.4462 39 68.5C39 87.5538 54.4462 103 73.5 103Z"
        fill="url(#paint1_linear)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="146"
        height="146"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d"
        x="37.241"
        y="35.3266"
        width="73.6396"
        height="73.6396"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="23"
        y1="24"
        x2="121"
        y2="115"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#08D5B0" />
        <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="23"
        y1="24"
        x2="123.5"
        y2="116"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#08D5B0" />
        <stop offset="1" stop-color="#DCDCDC" stop-opacity="0.1" />
      </linearGradient>
      <filter id="squiggly-0">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.02"
          numOctaves="3"
          result="noise"
          seed="0"
        />
        <feDisplacementMap
          id="displacement"
          in="SourceGraphic"
          in2="noise"
          scale="2"
        />
      </filter>
      <filter id="squiggly-1">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.02"
          numOctaves="3"
          result="noise"
          seed="1"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>

      <filter id="squiggly-2">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.02"
          numOctaves="3"
          result="noise"
          seed="2"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
      </filter>
      <filter id="squiggly-3">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.02"
          numOctaves="3"
          result="noise"
          seed="3"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>

      <filter id="squiggly-4">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.02"
          numOctaves="3"
          result="noise"
          seed="4"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
      </filter>
    </defs>
  </svg>
);

const DecoratedText = ({
  color,
  children
}: {
  color: string;
  children: React.ReactNode;
}) => <span style={{ textDecoration: "underline", color }}>{children}</span>;

export default function WelcomePage() {
  const { isLoggedIn, login } = useLoginContext();

  if (isLoggedIn) {
    return <Redirect to="/top/artists" />;
  }

  return (
    <section className="hero is-dark is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <LogoSvg />
          <h1 className="title is-size-1">Welcome</h1>
          <h2 className="subtitle">
            <p>
              Soundbound is an experimental music{" "}
              <DecoratedText color="#2cc8ab">discovery</DecoratedText> and{" "}
              <DecoratedText color="#b97fa6">reflection</DecoratedText> app
              powered by Spotify.
            </p>{" "}
          </h2>
          <h2 className="subtitle">To get started:</h2>
          <button className="button is-primary" onClick={login}>
            Login with Spotify
          </button>
        </div>
      </div>
    </section>
  );
}
