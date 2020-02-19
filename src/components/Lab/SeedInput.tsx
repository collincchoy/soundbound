import React from "react";
import SearchBox from "../SearchBox";
import { ErrorMessage } from "formik";

type SeedInputProps<T> = {
  name: string;
  getSuggestions: (inputValue: string) => Promise<T[]>;
};

export default function SeedInput<T>({
  name,
  getSuggestions,
  ...props
}: SeedInputProps<T>) {
  const displayName = name[0].toUpperCase() + name.slice(1);
  return (
    <div className="field">
      <label htmlFor="tracks" className="label">
        {displayName}
      </label>
      <SearchBox
        name={name}
        className="input"
        getSuggestions={getSuggestions}
        suggestionKey={(item: any) => ({
          key: item.id,
          value: item.name
        })}
        {...props}
      />
      <ErrorMessage name={name} className="help" />
    </div>
  );
}
