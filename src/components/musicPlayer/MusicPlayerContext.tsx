import {Track} from '../types';
import React, { useState, useContext, useEffect } from 'react';
import { MusicPlayer } from './musicPlayer';

type MusicPlayerContextType = {
  currentTrack: Track | null, setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>,
  player: HTMLAudioElement, setPlayer: React.Dispatch<React.SetStateAction<HTMLAudioElement>>,
  playQueue: Track[], setPlayQueue: React.Dispatch<React.SetStateAction<Track[]>>,
  isPlaying: boolean, setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
}
const MusicPlayerContext = React.createContext<MusicPlayerContextType>({
  currentTrack: null, setCurrentTrack: _ => {},
  player: new Audio(), setPlayer: _ => {},
  playQueue: [], setPlayQueue: _ => {},
  isPlaying: false, setIsPlaying: _ => {},
});

function useMusicPlayer() {
  const {currentTrack, setCurrentTrack,
         player, isPlaying,
         playQueue, setPlayQueue,
        } = useContext(MusicPlayerContext);

  return {
    currentTrack,
    changeTrack: (track: Track) => {
      player.src = track.preview_url;
      setCurrentTrack(track);
    },
    play: () => player.play(),
    pause: () => player.pause(),
    addToPlayQueue: (track: Track) => {
      setPlayQueue((prev) => [...prev, track]);
    },
    addBatchToPlayQueue: (tracks: Track[]) => {
      setPlayQueue((prev) => [...prev, ...tracks]);
    },
    isPlaying,
    playQueue,
  }
}

function MusicPlayerProvider(props: React.PropsWithChildren<any>) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playQueue, setPlayQueue] = useState<Track[]>([]);
  const [player, setPlayer] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleOnEnd = () => {
      const nextTrack = playQueue.shift();
      if (nextTrack) {
        player.src = nextTrack.preview_url;
        setCurrentTrack(nextTrack);
        player.play();
      } else {
        setIsPlaying(false);
      }
    }
    player.addEventListener("ended", handleOnEnd);
    const handleOnPause = () => setIsPlaying(false);
    player.addEventListener("pause", handleOnPause);
    const handleOnPlay = () => setIsPlaying(true);
    player.addEventListener("play", handleOnPlay);

    return () => {
      console.log("CLEANUP!")
      player.removeEventListener("ended", handleOnEnd);
      player.removeEventListener("pause", handleOnPause);
      player.removeEventListener("play", handleOnPlay);
    }
  }, [player, playQueue]);

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