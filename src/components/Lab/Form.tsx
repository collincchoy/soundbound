import React from "react";
import classes from "./Form.module.css";
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

const LabForm = (props: LabFormProps) => {
  const DEFAULT_NUM_TRACKS = 20;
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
          numberOfTracks: DEFAULT_NUM_TRACKS,
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
      >
        {formProps => (
          <Form>
            <SearchableInput
              name="artists"
              getSuggestions={searchForArtist}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name
              })}
            />
            <SearchableInput
              name="tracks"
              getSuggestions={searchForTrack}
              suggestionKey={(item: any) => ({
                key: item.id,
                value: item.name
              })}
            />
            <SearchableInput
              name="genres"
              getSuggestions={searchForGenre}
              suggestionKey={item => ({ key: item, value: item })}
            />

            <NumberInput
              name="numberOfTracks"
              label="# of tracks"
              defaultValue={DEFAULT_NUM_TRACKS}
              minValue={1}
              maxValue={100}
            />

            <div className={`field ${classes.advancedTuning}`}>
              {trackAttributes.map(attribute => (
                <AdvancedTuner
                  key={attribute.name}
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
