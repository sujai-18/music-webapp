import React from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import MusicCard from "./shared/musicCard";
import { MusicCardContainer } from "../styles/styledCss";
import CommonModal from "./shared/modal";

interface Album {
  title: string;
  artist: string;
  category: string;
  images: string[];
}

const Album: React.FC = () => {
  const selectedMusicList = useAppSelector(
    (state) => state.commonReducer.selectedMusicList
  );
  const { albumList, playlistModal } = useAppSelector(
    (state) => state.commonReducer
  );

  return (
    <>
      <MusicCardContainer>
        {albumList?.map(({ images, title, artist, category, key }: any) => (
          <MusicCard
            title={title}
            artist={artist}
            category={category}
            src={images[2]}
            itemKey={key}
          />
        ))}
      </MusicCardContainer>
      <CommonModal />
    </>
  );
};

export default Album;
