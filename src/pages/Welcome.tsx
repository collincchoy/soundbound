import React from "react";
import styled from "styled-components";
import { useLoginContext } from "hooks/Login";
import { NavLink } from "react-router-dom";
import ScrollableView from "components/ScrollableView";
import ArtistCard from "components/Artist/Card";
import TrackCard from "components/Track/Card";
import { artists, tracks } from "spotify/exampleData";
import SpinningLogo from "components/Welcome/SpinningLogo";
import ForkMeRibbon from "components/Welcome/ForkMeRibbon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MixingPot from "components/Welcome/MixingPot";
import Section from "components/Welcome/Section";
import HoverLink from "components/Welcome/HoverLink";

const ArtistCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  height: 100%;
`;

const MoreInfoDiv = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  position: absolute;
  width: 100%;
  bottom: 0.6rem;
  left: 0px;
  opacity: 0.6;
`;

const SectionText = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const CenteredContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default function WelcomePage() {
  const { isLoggedIn, login } = useLoginContext();
  return (
    <ScrollableView>
      <Section
        className="is-dark"
        renderAfter={() => (
          <MoreInfoDiv>
            <p>More Info</p>
            <FontAwesomeIcon icon={faCaretDown} style={{ fontSize: "1.5em" }} />
          </MoreInfoDiv>
        )}
      >
        <SpinningLogo />
        <h1 className="title is-size-1">Welcome</h1>
        <h2 className="subtitle">
          <p>
            Soundbound is an{" "}
            <HoverLink
              color="rgba(255, 255, 255, 0.9)"
              href="#about"
              hoverColor="rgba(15, 15, 15, 1)"
            >
              experimental
            </HoverLink>{" "}
            music{" "}
            <HoverLink
              color="rgb(44, 200, 171)"
              href="#discovery"
              hoverColor="rgba(185, 127, 166, 0.7)"
            >
              discovery
            </HoverLink>{" "}
            and{" "}
            <HoverLink
              color="rgb(185, 127, 166)"
              href="#reflection"
              hoverColor="rgba(44, 200, 171, 0.45)"
            >
              reflection
            </HoverLink>{" "}
            app powered by Spotify.
          </p>{" "}
        </h2>
        <h2 className="subtitle">To get started:</h2>
        {isLoggedIn ? (
          <NavLink className="button is-primary" to="/top/tracks">
            See your Top Tracks & Artists
          </NavLink>
        ) : (
          <button className="button is-primary" onClick={login}>
            Login with Spotify
          </button>
        )}
        <ForkMeRibbon />
      </Section>
      <Section id="reflection" className="is-primary">
        <h1 className="title is-spaced">Top Tracks & Artists</h1>
        <h3 className="subtitle">
          Stuck in playlist-mode? Have a tune stuck in your head from a playlist
          you listen to on repeat but can't recall the name or artist?
          <SectionText>
            Revisit your <strong>Top Artists</strong> &{" "}
            <strong>Top Tracks</strong> from the past month, 6 months, and more,
            and indulge in 30-second track previews to quickly reflect on your
            recent favorites.
          </SectionText>
        </h3>
        <div className="columns">
          <div className="column is-one-fifth">
            <ArtistCardColumn>
              <ArtistCard {...artists[0]} />
              <ArtistCard {...artists[1]} />
            </ArtistCardColumn>
          </div>
          <div className="column is-one-fifth">
            <ArtistCardColumn>
              <ArtistCard {...artists[2]} />
              <ArtistCard {...artists[3]} />
            </ArtistCardColumn>
          </div>
          <div className="column is-one-fifth">
            <CenteredContent>
              <FontAwesomeIcon icon={faExchangeAlt} size="3x" />
            </CenteredContent>
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
          Find new music by exploring relationships between artists, tracks, and
          genres.
          <SectionText>
            Lab allows you to generate playlists by mixing artists, tracks, and
            genres which you can then tune by track attributes like loudness,
            acousticness, valence, and more to find you new music!
          </SectionText>
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
            The project is actively under development - if you'd like to reach
            out, find me{" "}
            <a href="https://collincchoy.github.io">
              <span style={{ textDecoration: "line-through" }}>here</span>&nbsp;
            </a>
            soon . All feedback, questions, etc. are welcome! Note I am in no
            way affiliated with Spotify - just a happy and curious user.
          </p>
          <h3 className="subtitle">How does it work?</h3>
          <p>
            Soundbound is powered by <strong>Spotify</strong>. Anyone with a
            Spotify account can access any of the information that Soundbound
            provides by querying Spotify's public{" "}
            <a href="https://developer.spotify.com/documentation/web-api/reference/">
              Web API
            </a>
            . In fact that's how Soundbound "knows" about you. By logging in
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
