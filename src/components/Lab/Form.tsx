import React, { useState } from "react";
import classes from "./Form.module.css";
import { Formik, Form } from "formik";
import SeedInput from "./SeedInput";
import NumberOfTracksInput from "./NumberOfTracksInput";
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

const LabForm = (props: LabFormProps) => {
  const [showTuners, setShowTuners] = useState(false);
  const handleClick = () => {
    setShowTuners(!showTuners);
  };
  return (
    <div className={`container has-background-light ${classes.content}`}>
      <div className="content">
        <p>Tune your own playlist generator here!</p>
      </div>
      <Formik
        initialValues={{
          artists: "",
          tracks: "",
          genres: "",
          numberOfTracks: 20,
          /* Advanced Tuning Values */
          danceability: undefined,
          loudness: undefined
        }}
        // validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            props.onSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
        render={formProps => (
          <Form>
            <SeedInput
              name="artists"
              getSuggestions={searchForArtist}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name
              })}
            />
            <SeedInput
              name="tracks"
              getSuggestions={searchForTrack}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name
              })}
            />
            <SeedInput
              name="genres"
              getSuggestions={searchForGenre}
              suggestionKey={item => ({ key: item, value: item })}
            />

            <NumberOfTracksInput />

            <div
              className={`${classes.advancedTuning} ${!showTuners &&
                "is-hidden"}`}
            >
              {trackAttributes.map(attribute => (
                <AdvancedTuner
                  className={classes.advancedTuner}
                  {...attribute}
                />
              ))}
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  disabled={formProps.isSubmitting}
                  className={`button is-primary ${
                    formProps.isSubmitting ? "is-loading" : ""
                  }`}
                >
                  Submit
                </button>
              </div>
              <button className="button" type="button" onClick={handleClick}>
                Advanced Tuning
              </button>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

async function searchForArtist(artistName: string) {
  const params = {
    q: artistName,
    type: "artist"
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
    type: "track"
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
  genres.forEach(genre => {
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

export default LabForm;
