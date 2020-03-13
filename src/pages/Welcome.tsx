import React from "react";
import { useLoginContext } from "hooks/Login";
import { Redirect } from "react-router-dom";
import ScrollableView from "components/ScrollableView";
import ArtistCard from "components/Artist/Card";
import TrackCard from "components/Track/Card";
import { artists, tracks } from "spotify/exampleData";
import SpinningLogo from "components/Welcome/SpinningLogo";
import ForkMeRibbon from "components/Welcome/ForkMeRibbon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import MixingPot from "components/Welcome/MixingPot";

const DecoratedText: React.FC<{
  color: string;
  hoverColor?: string;
  linkTo?: string;
}> = ({ color, hoverColor, children, linkTo }) => {
  const [isHover, setIsHover] = React.useState(false);
  const styles: React.CSSProperties = {
    fontWeight: "bold", // The lower-case Nunito "r" is weird in "reflection". bold normalizes it so the hover background doesn't show
    textDecoration: "underline",
    color,
    background: `linear-gradient(to right, ${hoverColor ??
      color} 50%, transparent 50%`,
    backgroundSize: "200% 100%",
    backgroundPosition: isHover ? "left bottom" : "right bottom",
    transition: "background-position 1s ease"
  };
  return linkTo ? (
    <a
      href={linkTo}
      style={styles}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
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
    className={`hero is-fullheight has-text-centered is-bold ${className}`}
    {...props}
  >
    <div className="hero-body">
      <div className="container" style={{ maxWidth: "800px" }}>
        {children}
      </div>
    </div>
  </section>
);

const artistCardColumnStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%"
};

export default function WelcomePage() {
  const { isLoggedIn, login } = useLoginContext();

  if (isLoggedIn) {
    return <Redirect to="/top/artists" />;
  }

  return (
    <ScrollableView>
      <Section className="is-dark">
        <SpinningLogo />
        <h1 className="title is-size-1">Welcome</h1>
        <h2 className="subtitle">
          <p>
            Soundbound is an{" "}
            <DecoratedText
              color="rgba(255, 255, 255, 0.9)"
              linkTo="#about"
              hoverColor="rgba(15, 15, 15, 0.7)"
            >
              experimental
            </DecoratedText>{" "}
            music{" "}
            <DecoratedText
              color="rgb(44, 200, 171)"
              linkTo="#discovery"
              hoverColor="rgba(185, 127, 166, 0.7)"
            >
              discovery
            </DecoratedText>{" "}
            and{" "}
            <DecoratedText
              color="rgb(185, 127, 166)"
              linkTo="#reflection"
              hoverColor="rgba(44, 200, 171, 0.45)"
            >
              reflection
            </DecoratedText>{" "}
            app powered by Spotify.
          </p>{" "}
        </h2>
        <h2 className="subtitle">To get started:</h2>
        <button className="button is-primary" onClick={login}>
          Login with Spotify
        </button>
        <ForkMeRibbon />
      </Section>
      <Section id="reflection" className="is-primary">
        <h1 className="title is-spaced">Reflection</h1>
        <h3 className="subtitle">
          <p>
            Review your personal <strong>Top Artists</strong> and{" "}
            <strong>Top Tracks</strong> by listening history across 3 different
            time periods.
          </p>
          <p>
            Preview 30-second snippets of tracks to quickly rediscover those
            tracks you know by ear but struggle to remember by name.
          </p>
        </h3>
        <div className="columns">
          <div className="column is-one-fifth">
            <div style={artistCardColumnStyles}>
              <ArtistCard {...artists[0]} />
              <ArtistCard {...artists[1]} />
            </div>
          </div>
          <div className="column is-one-fifth">
            <div style={artistCardColumnStyles}>
              <ArtistCard {...artists[2]} />
              <ArtistCard {...artists[3]} />
            </div>
          </div>
          <div className="column is-one-fifth">
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FontAwesomeIcon icon={faExchangeAlt} size="3x" />
            </div>
          </div>
          <div className="column is-one-fifth">
            <TrackCard track={tracks[0] as any} />
          </div>
          <div className="column is-one-fifth">
            <TrackCard track={tracks[1] as any} />
          </div>
        </div>
      </Section>
      <Section id="discovery" className="is-light">
        <h1 className="title is-spaced">Discovery</h1>
        <h3 className="subtitle">
          <p>
            Find new music by exploring relationships between artists, tracks,
            and genres.
          </p>
          <p>
            Lab allows you to mix-&-match artists, tracks, and genres and then
            tune by track attributes like loudness, acousticness, valence, and
            more to find you new music!
          </p>
          {/* <p>
            Soundbound Discovery provides an infinite suggestion graph of
            artists or genres. Here you can interactively navigate between
            related artists and genres to discover new music. [Note: This area
            is currently under construction and not available at this time.]
          </p> */}
        </h3>
        <MixingPot />
      </Section>
      <Section id="about" className="is-info">
        <div className="content">
          <h1 className="title is-spaced">About</h1>
          <h3 className="subtitle">
            <span role="img" aria-label="Hello there">
              👋
            </span>
            &nbsp;We're so glad you're here.
          </h3>
          <p>
            Soundbound was born as a small, personal project to play with some
            new technologies, but also to explore the capabilities provided by
            the Spotify API.
          </p>
          <p>
            The project is still being worked on and if you'd like to reach out,
            find me{" "}
            <a href="https://collincchoy.github.io">
              <span style={{ textDecoration: "line-through" }}>here</span> soon
            </a>
            . All feedback, questions, etc. are welcome! Note I am in no way
            affiliated with Spotify - just a happy and curious user.
          </p>
          <h3 className="subtitle">How does it work?</h3>
          <p>
            Soundbound is powered by <strong>Spotify</strong>. Anyone with a
            Spotify account can access any of the information that Soundbound
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
