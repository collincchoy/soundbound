export type TrackAttribute = {
  name: string;
  description: string;
  minValue: number;
  maxValue: number;
  stepSize: number;
};

export const trackAttributes: TrackAttribute[] = [
  {
    name: "acousticness",
    description:
      "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  },
  {
    name: "danceability",
    description:
      "How suitable a track is for dancing based on a combination of tempo, rhythm stability, beat strength, and overall regularity. 0.0 is least danceable and 1.0 is most danceable.",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  },
  // This attribute is kind of weird.
  // {
  //   name: "duration_ms",
  //   description: "The duration of the track in milliseconds.",
  //   minValue: 0,
  //   maxValue: 600000, // 600 seconds => 10 minutes
  //   stepSize: 500, // half a second
  // },
  {
    name: "energy",
    description:
      "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  },
  {
    name: "instrumentalness",
    description:
      "Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  },
  {
    name: "key",
    description:
      "The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.",
    minValue: 0,
    maxValue: 11,
    stepSize: 1
  },
  {
    name: "liveness",
    description:
      "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  },
  {
    name: "loudness",
    description:
      "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.",
    minValue: -60,
    maxValue: 0,
    stepSize: 0.1
  },
  // TODO: this attribute doesn't really fit into min/max world unless min can be max
  // {
  //   name: "mode",
  //   description: "Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.",
  //   minValue: 0,
  //   maxValue: 1,
  //   stepSize: 1
  // }
  {
    name: "popularity",
    description:
      "The popularity of the track. The value will be between 0(⬇️) and 100(⬆️). The popularity is based mostly on the total number of plays and how recent those plays are.",
    minValue: 0,
    maxValue: 100,
    stepSize: 1
  },
  {
    name: "speechiness",
    description:
      "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  },
  {
    name: "tempo",
    description:
      "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.",
    minValue: 0,
    maxValue: 400, // FIXME: find suitable value
    stepSize: 1
  },
  // { FIXME
  //   name: "time_signature",
  //   description: "An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).",
  //   minValue: 0,
  //   maxValue: 1,
  //   stepSize: 0.05
  // }
  {
    name: "valence",
    description:
      "	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
    minValue: 0.0,
    maxValue: 1.0,
    stepSize: 0.01
  }
];
