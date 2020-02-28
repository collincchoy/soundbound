import React from "react";
import NumberInput from "components/NumberInput";
import TextWithHelp from "components/TextWithHelp";

type AdvancedTunerProps = {
  name: string;
  description: string;
  minValue: number;
  maxValue: number;
};

export default function AdvancedTuner({
  name,
  description,
  ...props
}: AdvancedTunerProps) {
  return (
    <div style={{ flex: 1 }}>
      <TextWithHelp text={name} tip={description} />

      <div style={{ display: "none" }}>
        <NumberInput name={`min_${name}`} label="min" {...props} />
        <NumberInput name={`target_${name}`} label="target" {...props} />
        <NumberInput name={`max_${name}`} label="max" {...props} />
      </div>
    </div>
  );
}
