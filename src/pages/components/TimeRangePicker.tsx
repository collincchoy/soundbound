import React from "react";
import { PersonalizationTimeRange } from "../../spotify/types";

export default function TimeRangePicker(props: {
  selected: PersonalizationTimeRange;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const options = Object.entries(PersonalizationTimeRange);
  return (
    <div className="control" style={{ padding: "0.75rem", textAlign: "center", color: "white"}}>
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
            {key}
          </label>
        );
      })}
    </div>
  );
}
