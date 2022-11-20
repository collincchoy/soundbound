/** Hook debugging utilities.
 * source: https://kyleshevlin.com/helpful-debugging-hooks
 */
import React from "react";

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function useLogChanges<T>(value: T) {
  const previousValue = usePrevious(value);
  const changes = getChanges(previousValue, value);

  if (changes.length) {
    changes.forEach((change) => {
      console.log(change);
    });
  }
}

export function getChanges<T>(previousValue: T, currentValue: T) {
  // Handle non-null objects
  if (
    typeof previousValue === "object" &&
    previousValue !== null &&
    typeof currentValue === "object" &&
    currentValue !== null
  ) {
    return Object.entries(currentValue).reduce(
      (acc: { name: string; previousValue: T; currentValue: T }[], cur) => {
        const [key, value] = cur;
        // @ts-ignore
        const oldValue = previousValue[key as any];

        if (value !== oldValue) {
          acc.push({
            name: key,
            previousValue: oldValue,
            currentValue: value,
          });
        }

        return acc;
      },
      []
    );
  }

  // Handle primitive values
  if (previousValue !== currentValue) {
    return [{ previousValue, currentValue }];
  }

  return [];
}
