import React from "react";
import { Field, ErrorMessage } from "formik";

type NumberInputProps = {
  name: string;
  label: string;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
};

export default function NumberInput({
  name,
  label,
  defaultValue,
  ...props
}: NumberInputProps) {
  const validate = (value: number) => {
    const { minValue, maxValue } = props;
    if (minValue !== undefined && value < minValue) {
      return `Invalid value: must be greater than ${minValue}`;
    }
    if (maxValue !== undefined && value > maxValue) {
      return `Invalid value: must be less than ${maxValue}`;
    }
  };
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <div className="field-body">
        <div className="control">
          <Field
            name={name}
            className="input"
            placeholder={defaultValue?.toString()}
            type="number"
            validate={validate}
          />
          <ErrorMessage name={name}>
            {msg => <div className="help is-danger">{msg}</div>}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
}
