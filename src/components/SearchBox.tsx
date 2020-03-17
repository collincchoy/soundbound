import React, { useState } from "react";
import styled from "styled-components";
import { useField } from "formik";

const StyledSearchBoxContainer = styled.div.attrs<{ isSearching: boolean }>(
  props => ({ className: `control ${props.isSearching && "is-loading"}` })
)<{ isSearching: boolean }>`
  position: relative;
`;

const SuggestionList = styled.ol`
  position: absolute;
  z-index: 400;
  background-color: hsl(0, 0%, 90%);
  list-style-type: none;
  border-radius: 5px;
`;

const Suggestion = styled.li<{ isSelected: boolean }>`
  padding: 5px 10px;
  transition: 0.2s;

  /* hover & mouse over */
  ${props =>
    props.isSelected &&
    `
  background-color: hsl(0, 0%, 21%);
  color: hsl(0, 0%, 96%);
  cursor: pointer;
  `}
`;

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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
          const { value } = suggestionKey(suggestions[selectedSuggestionIndex]);
          selectItem(value);
        }
        break;
      }
      default: {
      }
    }
  };

  return (
    <StyledSearchBoxContainer isSearching={isSearching}>
      <input
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <SuggestionList onMouseOut={() => setSelectedSuggestionIndex(-1)}>
          {suggestions.map((item: any, index: number) => {
            const { key, value } = suggestionKey(item);
            return (
              <Suggestion
                isSelected={index === selectedSuggestionIndex}
                key={key}
                onClick={() => selectItem(value)}
                onMouseDown={
                  /*Prevent blur event to avoid race condition with click event.*/
                  e => e.preventDefault()
                }
                onMouseOver={() => setSelectedSuggestionIndex(index)}
              >
                {value}
              </Suggestion>
            );
          })}
        </SuggestionList>
      )}
    </StyledSearchBoxContainer>
  );
}
