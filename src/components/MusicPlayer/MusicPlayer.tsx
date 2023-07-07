import React from "react";

import styles from "./index.module.css";
import { useMusicPlayer } from "./Context";
import PlayQueue from "./PlayQueue";
import TrackInfo from "./TrackInfo";
import PlayPauseButton from "./PlayPauseButton";
import styled from "styled-components";

export default function MusicPlayer() {
  const { currentTrack, isPlaying, pause, play, playQueue } = useMusicPlayer();

  let contents;
  if (!currentTrack) {
    contents = <span>No track to play.</span>;
  } else {
    contents = (
      <StyledWrapper>
        <div className={styles.left}>
          <TrackInfo track={currentTrack} />
        </div>
        <div className={styles.middle}>
          <PlayPauseButton
            onPlay={play}
            onPause={pause}
            isPlaying={isPlaying}
          />
        </div>
        <div className={styles.right}>
          <PlayQueue queue={playQueue} currentIndex={2} />
        </div>
      </StyledWrapper>
    );
  }
  return <div className={styles.MusicPlayer}>{contents}</div>;
}

const StyledWrapper = styled.div.attrs({ className: "container" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
