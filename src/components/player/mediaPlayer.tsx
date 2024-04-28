import React, { useState, useEffect, useRef } from "react";
import {
  StepBackwardFilled,
  PlayCircleFilled,
  PauseCircleFilled,
  StepForwardFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import { useAppSelector } from "../../hooks/reduxhooks";

interface Song {
  audioUrl: string;
}

const MusicPlayer: React.FC<{ playlist: Song[] }> = ({ playlist }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const { songClicked } = useAppSelector(
    (state) => state.commonReducer
  );
  useEffect(() => {
    audio.src = playlist[currentSongIndex].audioUrl;
    if (isPlaying) audio.play();
    else audio.pause();

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", playNextSong); 

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSongIndex, isPlaying]);

  const updateCurrentTime = () => {
    setCurrentTime(audio.currentTime);
  };

  const updateDuration = () => {
    setDuration(audio.duration);
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length
    );
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  const handleProgressBarDrag = (e: React.MouseEvent<HTMLInputElement>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / progressBar.offsetWidth) * duration;
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    if (songClicked) {
      setIsPlaying(false);
      setIsPlaying(true);
    }
  }, [songClicked]);

  return (
    <Space>
      <>
        <StepBackwardFilled onClick={playPreviousSong} />
        <div onClick={playPause}>
          {!isPlaying ? <PlayCircleFilled /> : <PauseCircleFilled />}
        </div>
        <StepForwardFilled onClick={playNextSong} />
      </>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressBarChange}
          onMouseDown={() => audio.pause()}
          onMouseUp={() => isPlaying && audio.play()}
        />
        <span className="start-time">{formatTime(currentTime)}</span>
        <span className="end-time">{formatTime(duration)}</span>
      </div>
    </Space>
  );
};


const MusicPlayerApp: React.FC = () => {
  const { songsList } = useAppSelector(
    (state) => state.commonReducer
  );
  return <MusicPlayer playlist={songsList} />;
};

export default MusicPlayerApp;
