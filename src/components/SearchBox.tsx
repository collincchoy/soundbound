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
  ...props
}: SearchBoxProps<T>) {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<T[]>([]);

  const [field, meta] = useField(props.name);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setIsSearching(true);
    let searchResults = getSuggestions(input.value);
    field.onChange(event);
    setSuggestions(await searchResults);
    setIsSearching(false);
  };

  return (
    <div className={`control ${styles.searchbox}`}>
      <input {...field} {...props} onChange={handleChange} autoComplete="off" />
      {isSearching ? (
        <div className="loader" />
      ) : suggestions.length > 0 ? (
        <ol className={styles.suggestions}>
          {suggestions.map((item: any) => {
            const { key, value } = props.suggestionKey(item);
            return (
              <li className={styles.suggestion} key={key}>
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
