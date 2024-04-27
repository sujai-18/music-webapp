import React from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import MusicCard from "./shared/musicCard";
import styled from 'styled-components';

const MusicCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

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
  const { albumList, artistList, categoryList } = useAppSelector(
    (state) => state.commonReducer
  );


  return (
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
  );
};

export default Album;
