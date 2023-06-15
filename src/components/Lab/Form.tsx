import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import SearchableInput from "./SearchableInput";
import NumberInput from "components/NumberInput";
import { SearchArtistResults, SearchTrackResults } from "spotify/types";
import { spotify } from "spotify/api";
import AdvancedTuner from "./AdvancedTuner";
import { trackAttributes, TrackAttribute } from "../../spotify/constants";

export type LabFormValues = {
  artists: string;
  tracks: string;
  genres: string;
  numberOfTracks: number;
  /* Advanced Tuning Values */
  danceability?: TrackAttribute;
  loudness?: TrackAttribute;
};

type LabFormProps = {
  onSubmit: (values: LabFormValues) => void;
};

export default function LabForm(props: LabFormProps) {
  const DEFAULT_NUM_TRACKS = 20;
  return (
    <StyledLabFormWrapper>
      <LabFormDescription>
        <LabFormHeader>Discover your perfect playlist!</LabFormHeader>
        <p>
          Customize your music experience by selecting artists, tracks, and
          genres, and fine-tune the sound with adjustable audio features. Submit
          your choices for a curated list of songs tailored to your preferences.
          Start exploring now!
        </p>
      </LabFormDescription>
      <Formik
        initialValues={{
          artists: "",
          tracks: "",
          genres: "",
          numberOfTracks: DEFAULT_NUM_TRACKS,
          /* Advanced Tuning Values */
          danceability: undefined,
          loudness: undefined,
        }}
        // validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            props.onSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formProps) => (
          <Form>
            <SearchableInput
              name="artists"
              getSuggestions={searchForArtist}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name,
              })}
              placeholder="Daft Punk"
            />
            <SearchableInput
              name="tracks"
              getSuggestions={searchForTrack}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name,
              })}
              placeholder="Take on Me"
            />
            <SearchableInput
              name="genres"
              getSuggestions={searchForGenre}
              suggestionKey={(item) => ({ key: item, value: item })}
              placeholder="indie-pop"
            />

            <NumberInput
              name="numberOfTracks"
              label="# of tracks"
              defaultValue={DEFAULT_NUM_TRACKS}
              minValue={1}
              maxValue={100}
            />

            <TunersDiv>
              {trackAttributes.map((attribute) => (
                <StyledTuner key={attribute.name} {...attribute} />
              ))}
            </TunersDiv>

            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  disabled={formProps.isSubmitting}
                  className={`button is-primary ${formProps.isSubmitting &&
                    "is-loading"}`}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button className="button is-danger" type="reset">
                  Reset
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </StyledLabFormWrapper>
  );
}

async function searchForArtist(artistName: string) {
  const params = {
    q: artistName,
    type: "artist",
  };
  const resp: SearchArtistResults = await spotify.get(
    "/search",
    undefined,
    params
  );
  return resp?.artists?.items;
}

async function searchForTrack(trackName: string) {
  const params = {
    q: trackName,
    type: "track",
  };
  const resp: SearchTrackResults = await spotify.get(
    "/search",
    undefined,
    params
  );
  return resp?.tracks?.items ?? [];
}

let _cached_genres: string[] = [];

async function searchForGenre(genre: string) {
  return sortGenresByMatch(await getAvailableGenres(), genre);
}

function sortGenresByMatch(genres: string[], query: string) {
  const suggestions: string[] = [];
  const rest: string[] = [];
  genres.forEach((genre) => {
    if (genre.toLowerCase().startsWith(query.toLowerCase())) {
      suggestions.push(genre);
    } else {
      rest.push(genre);
    }
  });
  return [...suggestions, ...rest];
}

async function getAvailableGenres() {
  if (_cached_genres.length <= 0) {
    const resp: { genres: string[] } = await spotify.get(
      "/recommendations/available-genre-seeds"
    );
    _cached_genres = resp.genres;
  }
  return _cached_genres;
}

const StyledLabFormWrapper = styled.div.attrs({
  className: "has-background-light",
})`
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  margin: 0.75rem 0;
`;

const LabFormHeader = styled.h1`
  margin-block-start: 1rem;
`;

const LabFormDescription = styled.div.attrs({
  className: "content",
})``;

const TunersDiv = styled.div.attrs({ className: "field" })`
  border: solid 1px black;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledTuner = styled(AdvancedTuner)`
  flex: 1;
  min-width: 150px;
  max-width: 250px;
`;
