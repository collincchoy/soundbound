import React from "react";
import SearchBox from "../SearchBox";
import { ErrorMessage } from "formik";

type SearchableInputProps<T> = {
  name: string;
  getSuggestions: (inputValue: string) => Promise<T[]>;
  suggestionKey: (item: T) => { key: string; value: string };
} & React.PropsWithoutRef<JSX.IntrinsicElements["input"]>;

export default function SearchableInput<T>({
  name,
  getSuggestions,
  ...props
}: SearchableInputProps<T>) {
  const displayName = name[0].toUpperCase() + name.slice(1);
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label htmlFor={name} className="label">
          {displayName}
        </label>
      </div>
      <div className="field-body">
        <SearchBox
          name={name}
          className="input"
          getSuggestions={getSuggestions}
          {...props}
        />
        <ErrorMessage name={name} className="help" />
      </div>
    </div>
  );
}
