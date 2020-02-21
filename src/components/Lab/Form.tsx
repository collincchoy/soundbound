import React from "react";
import styles from "./Form.module.css";
import { Formik } from "formik";
import SeedInput from "./SeedInput";
import { SearchArtistResults, SearchTrackResults } from "spotify/types";
import { spotify } from "spotify/api";

export type LabFormValues = {
  [key: string]: string; // FIXME: typescript hack to allow computed key values
  artists: string;
  tracks: string;
  genres: string;
};

type LabFormProps = {
  onSubmit: (values: LabFormValues) => void;
};

const validate = (values: { [key: string]: any }) => {
  const errors = {};
  // const errors: { email?: string } = {};
  // if (!values.email) {
  //   errors.email = "Required";
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  // ) {
  //   errors.email = "Invalid email address";
  // }
  return errors;
};

const LabForm = (props: LabFormProps) => (
  <Formik
    initialValues={{ artists: "", tracks: "", genres: "" }}
    validate={validate}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        props.onSubmit(values);
        setSubmitting(false);
      }, 400);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
      /* and other goodies */
    }) => (
      <div className={`container has-background-light ${styles.content}`}>
        <form onSubmit={handleSubmit}>
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

          <div className="control">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`button is-primary ${
                isSubmitting ? "is-loading" : ""
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )}
  </Formik>
);

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
    if (genre.startsWith(query)) {
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
