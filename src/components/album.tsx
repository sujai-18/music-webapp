import React from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import MusicCard from "./shared/musicCard";
import { MusicCardContainer } from "../styles/styledCss";
import CommonModal from "./shared/modal";
import { Spin } from "antd";

interface Album {
  title: string;
  artist: string;
  category: string;
  images: string[];
}

const Album: React.FC<any> = ({ activeTab }) => {
  const selectedMusicList = useAppSelector(
    (state) => state.commonReducer.selectedMusicList
  );
  const { albumList, loader, categoryList } = useAppSelector(
    (state) => state.commonReducer
  );
  const getList = () => {
    if (activeTab === "categories") {
      return categoryList;
    }
    return albumList;
  };
  if (loader) return <Spin fullscreen />;
  return (
    <>
      <MusicCardContainer>
        {getList()?.map(({ images, title, artist, category, key }: any) => (
          <MusicCard
            title={title}
            artist={artist}
            category={category}
            src={images[2]}
            itemKey={key}
            avatar={images[2]}
          />
        ))}
      </MusicCardContainer>
      <CommonModal />
    </>
  );
};

export default Album;
