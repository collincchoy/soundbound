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
          <SeedInput name="artists" getSuggestions={getArtistId} />
          <SeedInput name="tracks" getSuggestions={getTrackId} />
          <SeedInput
            name="genres"
            getSuggestions={async _ => ["pop", "chicago-blues"]}
          />

          <div className="control">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button is-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )}
  </Formik>
);

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
  return resp?.artists?.items;
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
  return resp?.tracks?.items ?? [];
}

export default LabForm;
