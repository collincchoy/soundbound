import React from "react";
import styled from "styled-components";
import { PersonalizationTimeRange } from "../spotify/types";

const Container = styled.div.attrs((_) => ({
  className: "control has-text-white has-text-centered",
}))`
  padding: 0.75rem;
`;

const OptionSelector = styled.select`
  border-radius: 8px;
  border-color: white;
  background-color: #fa7187;
  padding: 2px;

  font-weight: bold;

  cursor: pointer;
`;

export default function TimeRangePicker(props: {
  selected: PersonalizationTimeRange;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const options = Object.entries(PersonalizationTimeRange);
  return (
    <Container>
      <label className="is-size-5 has-text-weight-bold">Time Range: </label>
      <OptionSelector onChange={props.onChange}>
        {options.map(([key, displayName]) => {
          return (
            <option key={key} value={displayName}>
              {key}
            </option>
          );
        })}
      </OptionSelector>
    </Container>
  );
}
