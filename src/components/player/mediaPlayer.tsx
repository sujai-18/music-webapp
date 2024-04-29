import React, { useState, useEffect, useRef } from "react";
import {
  StepBackwardFilled,
  PlayCircleFilled,
  PauseCircleFilled,
  StepForwardFilled,
  RetweetOutlined,
  LineOutlined,
} from "@ant-design/icons";
import { Space, Typography } from "antd";
import { useAppSelector } from "../../hooks/reduxhooks";
import actions from "../../redux/common/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Song } from "../../utils/interface";

const { Text } = Typography;
const MusicPlayer: React.FC<{ playlist: Song[] }> = ({ playlist }) => {
  const dispatch = useDispatch();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongTitle, setCurrentSongTitle] = useState<string>("");
  const [repeatMode, setRepeatMode] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const { songClicked, queueListUrl, currentIndex } = useAppSelector(
    (state) => state.commonReducer
  );
  useEffect(() => {
    audio.src = playlist?.[currentSongIndex]?.audioUrl;
    setCurrentSongTitle(playlist[currentSongIndex].title || "");
    if (isPlaying) audio.play();
    else audio.pause();

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd); // Listen for ended event

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd); // Remove event listener
    };
  }, [currentSongIndex, isPlaying, queueListUrl.length, repeatMode]);

  const handleSongEnd = () => {
    if (repeatMode) {
      // If repeat mode is enabled, replay the current song
      audio.currentTime = 0;
      audio.play();
    } else if (shuffleMode) {
      // If shuffle mode is enabled, play a random song from the playlist
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSongIndex(randomIndex);
    } else if (
      queueListUrl.length > 0 &&
      queueListUrl.some((data: { status: boolean }) => !data.status)
    ) {
      const nextQueueItem = queueListUrl.find(
        (data: { status: any }) => !data.status
      );
      dispatch({
        type: actions.UPDATE_QUEUE,
        payload: undefined,
      });
      playQueueItem(nextQueueItem);
    } else {
      // If queueListUrl is empty, play the next song in the playlist
      playNextSong();
    }
  };

  const playQueueItem = (queueItem: Song) => {
    // Find the index of the queued item in the playlist
    const queueIndex = playlist.findIndex(
      (item) => item.audioUrl === queueItem.audioUrl
    );
    if (queueIndex !== -1) {
      // Set the current song index to the index of the queued item
      setCurrentSongIndex(queueIndex);
      // Play the queued item
      setIsPlaying(true);
    }
  };

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
      setIsPlaying(true);
    }
  }, [songClicked]);

  useEffect(() => {
    if (currentIndex) {
      setCurrentSongIndex(currentIndex);
    }
  }, [currentIndex]);
  const toggleRepeatMode = () => {
    dispatch({
      type: actions.MESSAGE_CONTENT,
      payload: repeatMode
        ? "Repeat mode set to Off !"
        : "Repeat mode set to On !",
    });
    setRepeatMode((prevMode) => !prevMode);
  };
  const toggleShuffleMode = () => {
    dispatch({
      type: actions.MESSAGE_CONTENT,
      payload: shuffleMode
        ? "Shuffle mode set to Off !"
        : "Shuffle mode set to On !",
    });
    setShuffleMode((prevMode) => !prevMode);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <Space className="space-container">
      <div className="media-player">
        <Space>
          <div onClick={toggleShuffleMode}>
            {shuffleMode ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <div className="shuffle-icon">
                <FontAwesomeIcon icon={faShuffle} />
              </div>
            )}
          </div>
          <StepBackwardFilled onClick={playPreviousSong} />
          <div onClick={playPause}>
            {!isPlaying ? <PlayCircleFilled /> : <PauseCircleFilled />}
          </div>
          <StepForwardFilled onClick={playNextSong} />
          <div onClick={toggleRepeatMode}>
            {!repeatMode ? (
              <RetweetOutlined />
            ) : (
              <div className="icon-relative">
                <RetweetOutlined />
                <div className="icon-absolute">
                  <LineOutlined />
                </div>
              </div>
            )}
          </div>
        </Space>
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
      </div>
      <div>
        <Text copyable italic>
          {currentSongTitle}
        </Text>
      </div>
    </Space>
  );
};

const MusicPlayerApp: React.FC = () => {
  const { songsList } = useAppSelector((state) => state.commonReducer);
  return <MusicPlayer playlist={songsList} />;
};

export default MusicPlayerApp;
