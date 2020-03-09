import React from "react";

export default function AboutSection() {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">About</h1>
          <article>
            <p>Hello,</p>
            <p>
              We're so glad you're here. Soundbound is a small personal project
              of mine to play with some "new" technologies but also to explore
              the capabilities provided by the Spotify API.
            </p>
            <p>
              The project is still being worked on and if you'd like to reach
              out, find me <a href="https://collincchoy.github.io">here</a>. All
              feedback, questions, etc. are welcome!
            </p>
            <h2>How does it work?</h2>
            <p>
              Soundbound is powered by <strong>Spotify</strong>. Anybody that
              has a Spotify account can actually access all of the information
              that Soundbound provides by querying their public Web API (
              <a href="https://developer.spotify.com/documentation/web-api/reference/">
                Docs here
              </a>
              ). In fact that's how Soundbound "knows" about you. By logging in
              with Spotify, Soundbound is just taking care of the hard things
              and putting the power directly in your hands.
            </p>
            <p>
              If you'd like to see how it ticks under the hood, the code is
              opensource(freely available online!). Just click the ribbon in the
              bottom-left corner to read or fork the code on github.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
