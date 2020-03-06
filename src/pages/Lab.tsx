import React, { useState } from "react";
import LabForm, { LabFormValues } from "../components/Lab/Form";
import PageContent from "../components/PageContent";
import { spotify } from "../spotify/api";
import {
  SearchArtistResults,
  SearchTrackResults,
  RecommendationsQuery
} from "../spotify/types";
import LabResults from "components/Lab/Results";
import { trackAttributes, TrackAttribute } from "spotify/constants";

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
  const waitFors: { key: string; val: Promise<any> }[] = [];

  /* Seed inputs */
  if (values.artists.length > 0) {
    waitFors.push({ key: "artists", val: getArtistId(values.artists) });
  }
  if (values.tracks.length > 0) {
    waitFors.push({ key: "tracks", val: getTrackId(values.tracks) });
  }
  if (values.genres.length > 0) {
    query.seed_genres = values.genres;
  }

  if (values.numberOfTracks) {
    query.limit = values.numberOfTracks.toString();
  }

  /* Advanced Tuning Inputs */
  trackAttributes.forEach(attribute => {
    const tunedValue: TrackAttribute | undefined = (values as any)[
      attribute.name
    ];
    if (tunedValue !== undefined) {
      query[`min_${attribute.name}`] = tunedValue.minValue.toString();
      query[`max_${attribute.name}`] = tunedValue.maxValue.toString();
    }
  });

  // Do this at the end to take adv of async
  if (waitFors.length > 0) {
    for (const { key, val } of waitFors) {
      query[`seed_${key}`] = await val;
    }
  }
  return query;
}

export default function LabPage() {
  const [query, setQuery] = useState<RecommendationsQuery | undefined>();

  const handleSubmit = async (values: LabFormValues) => {
    const q = await formToQuery(values); // TODO: handle errors thrown from spotify client
    setQuery(q);
  };
  return (
    <PageContent>
      <LabForm onSubmit={handleSubmit} />
      {query && <LabResults query={query} />}
    </PageContent>
  );
}
