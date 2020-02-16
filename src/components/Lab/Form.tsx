import React from "react";
import { Formik } from "formik";

interface LabFormInputs {
  artists: string;
  tracks: string;
  genres: string;
}

const LabForm = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ artists: "", tracks: "", genres: "" }}
      validate={values => {
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
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
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
        // <section className="section">
        <div className="container has-background-light">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="artists">Artists:</label>
              <input
                type="text"
                name="artists"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.artists}
              />
              {errors.artists && touched.artists && errors.artists}
            </div>

            <div className="field">
              <label htmlFor="tracks" className="label">
                Tracks:
              </label>
              <input
                type="text"
                name="tracks"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tracks}
                className="input"
              />
              <p className="help">
                {errors.tracks && touched.tracks && errors.tracks}
              </p>
            </div>

            <div className="field">
              <label htmlFor="genres" className="label">
                Genres:
              </label>
              <div className="control" style={{ borderRadius: "6px" }}>
                <input
                  type="text"
                  name="genres"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.genres}
                  className="input"
                />
              </div>
              {errors.genres && touched.genres && errors.genres}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        </div>
        // </section>
      )}
    </Formik>
  </div>
);

export default LabForm;
