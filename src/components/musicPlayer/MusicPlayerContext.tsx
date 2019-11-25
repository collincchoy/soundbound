import {Track} from '../types';
import React, { useState, useContext, useEffect } from 'react';
import { MusicPlayer } from './musicPlayer';

type MusicPlayerContextType = {
  currentTrack: Track | null, setCurrentTrack: (track: Track) => void,
  player: HTMLAudioElement, setPlayer: (newAudio: HTMLAudioElement) => void,
  playQueue: Track[], setPlayQueue: React.Dispatch<React.SetStateAction<never[]>>,
  isPlaying: boolean, setIsPlaying: (_: boolean) => void,
}
const MusicPlayerContext = React.createContext<MusicPlayerContextType>({
  currentTrack: null, setCurrentTrack: () => {},
  player: new Audio(), setPlayer: (_) => {},
  playQueue: [], setPlayQueue: (_) => {},
  isPlaying: false, setIsPlaying: _ => {},
});

function useMusicPlayer() {
  const {currentTrack, setCurrentTrack, player, playQueue, isPlaying} = useContext(MusicPlayerContext);

  return {
    currentTrack,
    changeTrack: (track: Track) => {
      player.src = track.preview_url;
      setCurrentTrack(track);
    },
    play: () => player.play(),
    pause: () => player.pause(),
    isPlaying,
    playQueue,
  }
}

function MusicPlayerProvider(props: React.PropsWithChildren<any>) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playQueue, setPlayQueue] = useState([]);
  const [player, setPlayer] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const handleOnStop = () => setIsPlaying(false);
    player.addEventListener("ended", handleOnStop);
    player.addEventListener("pause", handleOnStop);
    const handleOnPlay = () => setIsPlaying(true);
    player.addEventListener("play", handleOnPlay);

    return () => {
      player.removeEventListener("ended", handleOnStop);
      player.removeEventListener("pause", handleOnStop);
      player.removeEventListener("play", handleOnPlay);
    }
  }, [player]);

  const MusicPlayerContextValues = {
    currentTrack, setCurrentTrack,
    player, setPlayer,
    playQueue, setPlayQueue,
    isPlaying, setIsPlaying,
  }
  return (
    <MusicPlayerContext.Provider value={MusicPlayerContextValues}>
      {props.children}
      <MusicPlayer />
    </MusicPlayerContext.Provider>
  );
}

export {useMusicPlayer, MusicPlayerProvider};