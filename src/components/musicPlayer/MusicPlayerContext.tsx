import {Track} from '../types';
import React, { useState } from 'react';

type MusicPlayerContextType = {
  currentTrack: Track | null,
  changeTrack: (track: Track) => void,
  play: () => void,
  pause: () => void,
  isPlaying: boolean,
  playQueue: Track[],
}
const MusicPlayerContext = React.createContext<MusicPlayerContextType>({
  currentTrack: null, changeTrack: () => {},
  play: () => {}, pause: () => {}, isPlaying: false,
  playQueue: [],
});

function MusicPlayerProvider(props: React.PropsWithChildren<any>) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [player] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  function changeTrack(track: Track) {
    player.src = track.preview_url;
    setCurrentTrack(track);
  }

  function play() {
    player.play();
    setIsPlaying(true);
  }

  function pause() {
    player.pause();
    setIsPlaying(false);
  }

  const [playQueue, setPlayQueue] = useState([]);

  const MusicPlayerContextValues = {
    currentTrack,
    changeTrack,
    play,
    pause,
    isPlaying,
    playQueue,
  }
  return (
    <MusicPlayerContext.Provider value={MusicPlayerContextValues}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export {MusicPlayerContext, MusicPlayerProvider};