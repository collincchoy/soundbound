import React from "react";
import { useSpotifyApi } from "spotify/hooks";
import TrackGallery from "components/Track/Gallery";
import { RecommendationsQuery, Recommendations } from "spotify/types";

const LabResults = (props: { query: RecommendationsQuery }) => {
  const { query } = props;
  const { data: results, error } = useSpotifyApi<Recommendations>(
    "/recommendations",
    query
  );

  return (
    <div style={{ marginTop: "10px" }}>
      {results ? (
        <TrackGallery tracks={results.tracks} />
      ) : (
        error && (
          <article className="message is-danger">
            <div className="message-header">
              <p>Error</p>
              <button className="delete" aria-label="delete"></button>
            </div>
            <div className="message-body">{JSON.stringify(error)}</div>
          </article>
        )
      )}
    </div>
  );
};

export default LabResults;
