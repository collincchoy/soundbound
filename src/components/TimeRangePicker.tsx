import React from "react";
import styled from "styled-components";
import { PersonalizationTimeRange } from "../spotify/types";
import TextWithHelp from "./TextWithHelp";

const Container = styled.div.attrs(_ => ({
  className: "control has-text-white has-text-centered"
}))`
  padding: 0.75rem;
  .radio:hover {
    color: hsl(0, 0%, 40%);
  }
`;

export default function TimeRangePicker(props: {
  selected: PersonalizationTimeRange;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const options = Object.entries(PersonalizationTimeRange);
  const helpText = new Map([
    ["SHORT", "1 month"],
    ["MEDIUM", "6 months"],
    ["LONG", "1+ years"]
  ]);
  return (
    <Container>
      <label>Time Range: </label>
      {options.map(([key, value]) => {
        return (
          <label className="radio" key={key}>
            <input
              type="radio"
              name={key}
              value={value}
              checked={props.selected === value ? true : false}
              onChange={props.onChange}
            />
            &nbsp;
            <TextWithHelp
              text={key}
              tip={helpText.get(key) ?? ""}
              cursorIsHelp={false}
            />
          </label>
        );
      })}
    </Container>
  );
}
