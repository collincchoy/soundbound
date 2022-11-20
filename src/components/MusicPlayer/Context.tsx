import { Track } from "../../spotify/types";
import React, { useState, useContext, useEffect } from "react";

type MusicPlayerContextType = {
  currentTrack: Track | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
  player: HTMLAudioElement;
  setPlayer: React.Dispatch<React.SetStateAction<HTMLAudioElement>>;
  playQueue: Track[];
  setPlayQueue: React.Dispatch<React.SetStateAction<Track[]>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};
const MusicPlayerContext = React.createContext<MusicPlayerContextType>({
  currentTrack: null,
  setCurrentTrack: (_) => {},
  player: new Audio(),
  setPlayer: (_) => {},
  playQueue: [],
  setPlayQueue: (_) => {},
  isPlaying: false,
  setIsPlaying: (_) => {},
});

const handleNullPreviewUrl = (badTrack: Track) => {
  alert(`The next track ${badTrack.name} by ${badTrack.artists
    .map((artist) => artist.name)
    .join(", ")} does not have a preview_url. 😢

The full track info is below:

${JSON.stringify(badTrack)}`);
};

function useMusicPlayer() {
  const {
    currentTrack,
    setCurrentTrack,
    player,
    isPlaying,
    playQueue,
    setPlayQueue,
  } = useContext(MusicPlayerContext);

  return {
    currentTrack,
    currentTrackIs(track: Track) {
      return track.id === currentTrack?.id;
    },
    changeTrack: (next: Track) => {
      if (next.preview_url == null) {
        handleNullPreviewUrl(next);
      } else {
        player.src = next.preview_url;
        setCurrentTrack(next);
      }
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
  };
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
        if (nextTrack.preview_url == null) {
          handleNullPreviewUrl(nextTrack);
          handleOnEnd(); // skip this track
        } else {
          player.src = nextTrack.preview_url;
          setCurrentTrack(nextTrack);
        }
        player.play();
      } else {
        setIsPlaying(false);
      }
    };
    player.addEventListener("ended", handleOnEnd);
    const handleOnPause = () => setIsPlaying(false);
    player.addEventListener("pause", handleOnPause);
    const handleOnPlay = () => setIsPlaying(true);
    player.addEventListener("play", handleOnPlay);

    return () => {
      console.debug("MUSIC PLAYER CLEANUP!");
      player.removeEventListener("ended", handleOnEnd);
      player.removeEventListener("pause", handleOnPause);
      player.removeEventListener("play", handleOnPlay);
    };
  }, [player, playQueue]);

  const MusicPlayerContextValues = {
    currentTrack,
    setCurrentTrack,
    player,
    setPlayer,
    playQueue,
    setPlayQueue,
    isPlaying,
    setIsPlaying,
  };
  return (
    <MusicPlayerContext.Provider value={MusicPlayerContextValues}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export { useMusicPlayer, MusicPlayerProvider };
