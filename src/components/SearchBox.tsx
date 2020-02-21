import React, { useState } from "react";
import styles from "./SearchBox.module.css";
import { useField } from "formik";

type SearchBoxProps<T> = {
  name: string;
  getSuggestions: (inputValue: string) => Promise<T[]>;
  suggestionKey: (item: T) => { key: string; value: string };
} & React.PropsWithoutRef<JSX.IntrinsicElements["input"]>;

export default function SearchBox<T>({
  getSuggestions,
  suggestionKey,
  ...props
}: SearchBoxProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T>();
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const [field, meta, helpers] = useField(props.name);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    field.onChange(event);
    if (input.value !== "") {
      let searchResults = getSuggestions(input.value);
    if (input.value !== "") {
      setIsSearching(true);
      setSuggestions(await searchResults);
    } else {
      clearSuggestions();
    }
    setIsSearching(false);
  };
  const handleBlur = async (event: React.FocusEvent) => {
    field.onBlur(event);
    setIsSearching(false);
    clearSuggestions();
  };

  return (
    <div
      className={`control ${styles.searchbox} ${
        isSearching ? "is-loading" : ""
      }`}
    >
      <input
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {suggestions.length > 0 ? (
        <ol className={styles.suggestions}>
          {suggestions.map((item: any) => {
            const { key, value } = suggestionKey(item);
            return (
              <li
                className={styles.suggestion}
                key={key}
                onClick={() => {
                  console.log("hey - ", value);
                  helpers.setValue(value);
                  clearSuggestions();
                }}
                onMouseDown={
                  /*Prevent blur event to avoid race condition with click event.*/
                  e => e.preventDefault()
                }
              >
                {value}
              </li>
            );
          })}
        </ol>
      ) : (
        ""
      )}
    </div>
  );
}
