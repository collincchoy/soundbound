import React from "react";
import { Field, ErrorMessage } from "formik";

type SeedInputProps = {
  name: string;
};

export default function SeedInput(props: SeedInputProps) {
  const displayName = props.name[0].toUpperCase() + props.name.slice(1);
  return (
    <div className="field">
      <label htmlFor="tracks" className="label">
        {displayName}
      </label>
      <Field name={props.name} className="input" />
      <ErrorMessage name={props.name} className="help" />
    </div>
  );
}
