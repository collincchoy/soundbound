import React from "react";
import styles from "./Form.module.css";
import { Formik } from "formik";
import SeedInput from "./SeedInput";

export type LabFormValues = {
  [key: string]: string; // FIXME: typescript hack to allow computed key values
  artists: string;
  tracks: string;
  genres: string;
};

type LabFormProps = {
  onSubmit: (values: LabFormValues) => void;
};

const LabForm = (props: LabFormProps) => (
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
          <SeedInput name="artists" />
          <SeedInput name="tracks" />
          <SeedInput name="genres" />

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

export default LabForm;
