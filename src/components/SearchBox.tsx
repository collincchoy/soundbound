import React, { useState } from "react";
import classes from "./SearchBox.module.css";
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
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<
    number
  >(-1);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const clearSuggestions = () => {
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const [field, , helpers] = useField(props.name);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    field.onChange(event);
    if (input.value !== "") {
      let searchResults = getSuggestions(input.value);
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
  const selectItem = (value: string) => {
    helpers.setValue(value);
    clearSuggestions();
  };

  return (
    <div
      className={`control ${classes.searchbox} ${
        isSearching ? "is-loading" : ""
      }`}
    >
      <input
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e: React.KeyboardEvent) => {
          switch (e.key) {
            case "ArrowUp": {
              e.preventDefault(); // Moves cursor to start of input box
              if (selectedSuggestionIndex > -1)
                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
              break;
            }
            case "ArrowDown": {
              // Note: do not preventDefault here b/c moves cursor to end of input box is useful
              if (selectedSuggestionIndex < suggestions.length)
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              break;
            }
            case "Enter": {
              if (
                -1 < selectedSuggestionIndex &&
                selectedSuggestionIndex < suggestions.length
              ) {
                e.preventDefault(); // Do not submit form
                const { value } = suggestionKey(
                  suggestions[selectedSuggestionIndex]
                );
                selectItem(value);
              }
              break;
            }
            default: {
            }
          }
        }}
        autoComplete="off"
      />
      {suggestions.length > 0 ? (
        <ol
          className={classes.suggestions}
          onMouseOut={() => setSelectedSuggestionIndex(-1)}
        >
          {suggestions.map((item: any, index: number) => {
            const { key, value } = suggestionKey(item);
            return (
              <li
                className={`${classes.suggestion} ${
                  index === selectedSuggestionIndex ? classes.hover : ""
                }`}
                key={key}
                onClick={() => selectItem(value)}
                onMouseDown={
                  /*Prevent blur event to avoid race condition with click event.*/
                  e => e.preventDefault()
                }
                onMouseOver={() => setSelectedSuggestionIndex(index)}
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
