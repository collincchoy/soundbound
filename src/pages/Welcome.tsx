import React from "react";
import classes from "./Welcome.module.css";
import { useLoginContext } from "hooks/Login";
import { Redirect } from "react-router-dom";
import ScrollableView from "components/ScrollableView";

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
        fillOpacity="0.6"
      />
      <g className={classes.logoRecord} filter="url(#filter1_d)">
        <line
          x1="54.9687"
          y1="49.0289"
          x2="93.127"
          y2="85.8243"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="42.2409"
          y1="77.3388"
          x2="64.8683"
          y2="99.9663"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="83.2531"
          y1="36.3266"
          x2="105.881"
          y2="58.9541"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="58.5045"
          y1="72.3891"
          x2="69.8183"
          y2="83.7028"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="79.0104"
          y1="51.883"
          x2="90.3241"
          y2="63.1967"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
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
        colorinterpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
        colorinterpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
        <stop stopColor="#08D5B0" />
        <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="23"
        y1="24"
        x2="123.5"
        y2="116"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#08D5B0" />
        <stop offset="1" stopColor="#DCDCDC" stopOpacity="0.1" />
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

const DecoratedText: React.FC<{ color: string; linkTo?: string }> = ({
  color,
  children,
  linkTo
}) => {
  const styles = {
    textDecoration: "underline",
    color
  };
  return linkTo ? (
    <a href={linkTo} style={styles}>
      {children}
    </a>
  ) : (
    <span style={styles}>{children}</span>
  );
};

const Section: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <section
    {...props}
    className={`hero is-fullheight has-text-centered is-bold ${className}`}
  >
    <div className="hero-body">
      <div className="container">{children}</div>
    </div>
  </section>
);

export default function WelcomePage() {
  const { isLoggedIn, login } = useLoginContext();

  if (isLoggedIn) {
    return <Redirect to="/top/artists" />;
  }

  return (
    <ScrollableView>
      <Section className="is-dark">
        <LogoSvg />
        <h1 className="title is-size-1">Welcome</h1>
        <h2 className="subtitle">
          <p>
            Soundbound is an experimental music{" "}
            <DecoratedText color="#2cc8ab" linkTo="#discovery">
              discovery
            </DecoratedText>{" "}
            and{" "}
            <DecoratedText color="#b97fa6" linkTo="#reflection">
              reflection
            </DecoratedText>{" "}
            app powered by Spotify.
          </p>{" "}
        </h2>
        <h2 className="subtitle">To get started:</h2>
        <button className="button is-primary" onClick={login}>
          Login with Spotify
        </button>
        <a
          className={`${classes["github-fork-ribbon"]} ${classes["left-bottom"]} ${classes.fixed}`}
          href="https://github.com/collincchoy/soundbound"
          data-ribbon="Fork me on GitHub"
          title="Fork me on GitHub"
        >
          Fork me on GitHub
        </a>
      </Section>
      <Section id="reflection" className="is-primary">
        <h1 className="title is-spaced">Reflection</h1>
        <div className="subtitle">
          <p>
            Review your personal Top Artists and Top Tracks across 3 different
            time periods based on your listening history.
          </p>
          <p>
            Listen to quick 30-second snippets of tracks to rediscover those
            tracks you know by ear but struggle to remember the name.
          </p>
        </div>
      </Section>
      <Section id="discovery" className="is-second">
        <h1 className="title is-spaced">Discovery</h1>
        <h3 className="subtitle">
          <p>
            Find new music by exploring relationships between artists, tracks,
            and genres.
          </p>
          <p>
            Hit up the Soundbound Lab to access a Playlist Generator.
            Mix-and-match artists, tracks, and genres and then tune the
            algorithm yourself by adjusting various track attributes like
            loudness, acousticness, valence, and more. Soundbound will take your
            pool of inputs and generate a list of recommended tracks to check
            out!
          </p>
          {/* <p>
            Soundbound Discovery provides an infinite suggestion graph of
            artists or genres. Here you can interactively navigate between
            related artists and genres to discover new music. [Note: This area
            is currently under construction and not available at this time.]
          </p> */}
        </h3>
      </Section>
      <Section className="is-info">
        <div className="content">
          <h1 className="title is-spaced">About</h1>
          <h3 className="subtitle">We're so glad you're here.</h3>
          <p>
            Soundbound was born as a small, personal project to play with some
            new technologies, but also to explore the capabilities provided by
            the Spotify API.
          </p>
          <p>
            The project is still being worked on and if you'd like to reach out,
            find me <a href="https://collincchoy.github.io">here</a>. All
            feedback, questions, etc. are welcome!
          </p>
          <h3 className="subtitle">How does it work?</h3>
          <p>
            Soundbound is powered by <strong>Spotify</strong>. Anybody that has
            a Spotify account can access all of the information that Soundbound
            provides by querying Spotify's public Web API (
            <a href="https://developer.spotify.com/documentation/web-api/reference/">
              Docs
            </a>
            ). In fact that's how Soundbound "knows" about you. By logging in
            with Spotify, Soundbound is just taking care of the hard things and
            putting the power directly in your hands.
          </p>
          <p>
            If you'd like to see how it ticks under the hood, the code is freely
            available online (open to contributions!). Just click the ribbon in
            the bottom-left corner to read or fork the code on github.
          </p>
        </div>
      </Section>
    </ScrollableView>
  );
}
