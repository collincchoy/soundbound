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

export default function LabPage() {
  const [query, setQuery] = useState<RecommendationsQuery | undefined>();

  const handleSubmit = async (values: LabFormValues) => {
    const q = await formToQuery(values); // TODO: handle errors thrown from spotify client
    setQuery(q);
  };
  return (
    <PageContent>
      <LabForm onSubmit={handleSubmit} />
      {query ? <LabResults query={query} /> : ""}
    </PageContent>
  );
}
