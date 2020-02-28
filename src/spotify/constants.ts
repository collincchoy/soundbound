export const trackAttributes = [
  {
    name: "danceability",
    description:
      "how suitable a track is for dancing based on a combination of tempo, rhythm stability, beat strength, and overall regularity. 0.0 is least danceable and 1.0 is most danceable.",
    minValue: 0.0,
    maxValue: 1.0
  },
  {
    name: "loudness",
    description:
      "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.",
    minValue: -60,
    maxValue: 0
  }
];
