import React from "react";
import NumberInput from "components/NumberInput";

const DEFAULT_LENGTH = 20;

export default function NumberOfTracksInput() {
  return (
    <NumberInput
      name="numberOfTracks"
      label="# of tracks"
      defaultValue={DEFAULT_LENGTH}
      minValue={1}
      maxValue={100}
    />
  );
}
