import React from "react";
import TextWithHelp from "components/TextWithHelp";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import classes from "./index.module.css";
import Handle from "./Handle";
import Track from "./Track";
import { round } from "../../../utilities";
import { useField } from "formik";

type AdvancedTunerProps = {
  name: string;
  description: string;
  minValue: number;
  maxValue: number;
  stepSize: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function AdvancedTuner({
  name,
  description,
  minValue,
  maxValue,
  stepSize,
  ...props
}: AdvancedTunerProps) {
  const [field, , helpers] = useField(name);

  return (
    <div {...props}>
      <div className={classes.label}>
        <TextWithHelp text={name} tip={description} />
      </div>
      <Slider
        className={classes.slider}
        domain={[minValue, maxValue]}
        values={[
          field.value?.minValue ?? minValue,
          field.value?.maxValue ?? maxValue
        ]}
        onChange={values => {
          helpers.setValue({
            minValue: round(values[0], 2),
            maxValue: round(values[1], 2)
          });
        }}
        mode={2}
        step={stepSize}
      >
        <Rail>
          {({ getRailProps }) => (
            <div className={classes.rail} {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </>
          )}
        </Handles>
        <Tracks right={false} left={false}>
          {({ tracks, getTrackProps }) => (
            <>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </>
          )}
        </Tracks>
      </Slider>
    </div>
  );
}
