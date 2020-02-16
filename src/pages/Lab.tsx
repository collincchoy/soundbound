import React, { useState } from "react";
import LabForm, { LabFormValues } from "../components/Lab/Form";
import { useSpotifyApi } from "../spotify/hooks";
import TrackGallery from "../components/Track/Gallery";
import PageContent from "../components/PageContent";
import { spotify } from "../spotify/api";
import { SearchArtistResults, SearchTrackResults } from "../spotify/types";

async function getArtistId(artistName: string) {
  const params = {
    q: artistName,
    type: "artist"
  };
  const resp: SearchArtistResults = await spotify.get(
    "/search",
    undefined,
    params
  );
  return resp?.artists?.items[0].id;
}

async function getTrackId(trackName: string) {
  const params = {
    q: trackName,
    type: "track"
  };
  const resp: SearchTrackResults = await spotify.get(
    "/search",
    undefined,
    params
  );
  return resp?.tracks?.items?.[0]?.id; // FIME: better errorhandling
}

async function formToQuery(values: LabFormValues) {
  const query: { [key: string]: string } = {};
  const seedValues = ["artists", "tracks", "genres"]; // FIXME: convert to string enum
  const waitFors: { key: string; val: Promise<any> }[] = [];
  for (const seedValue of seedValues) {
    if (values[seedValue].length > 0) {
      if (seedValue === "artists" || seedValue === "tracks") {
        waitFors.push({
          key: seedValue,
          val:
            seedValue === "artists"
              ? getArtistId(values[seedValue])
              : getTrackId(values[seedValue])
        });
      } else {
        query[`seed_${seedValue}`] = values[seedValue];
      }
    }
  }
  if (waitFors.length > 0) {
    for (const { key, val } of waitFors) {
      query[`seed_${key}`] = await val;
    }
  }
  return query;
}

type RecommendationsQuery = {
  seed_artists?: string;
  seed_tracks?: string;
  seed_genres?: string;
};

export default function LabPage() {
  const [query, setQuery] = useState<RecommendationsQuery | undefined>();
  const { data: results, error } = useSpotifyApi("/recommendations", query);
  const handleSubmit = async (values: LabFormValues) => {
    const q = await formToQuery(values);
    setQuery(q);
  };
  return (
    <PageContent>
      <div className="container">
        <div className="content">
          <p>Tune your own playlist generator here!</p>
        </div>
        <LabForm onSubmit={handleSubmit} />
        <div style={{ marginTop: "10px" }}>
          {results ? (
            <TrackGallery tracks={results.tracks} />
          ) : error ? (
            <article className="message is-danger">
              <div className="message-header">
                <p>Error</p>
                <button className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">{JSON.stringify(error)}</div>
            </article>
          ) : (
            ""
          )}
        </div>
      </div>
    </PageContent>
  );
}
