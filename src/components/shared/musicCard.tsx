import React, { useState } from "react";
import { Card, message } from "antd";
import { fetchByTerm } from "../../api/api";
import { useAppSelector } from "../../hooks/reduxhooks";

interface MusicCardProps {
  src: string;
  title: string;
  artist: string;
  category: string;
  itemKey: string;
  avatar: string;
}
const { Meta } = Card;
const MusicCard: React.FC<MusicCardProps> = ({
  src,
  title,
  artist,
  category,
  itemKey,
  avatar,
}) => {
  const { addTab } = useAppSelector((state) => state.commonReducer);
  // Check if the clicked tab key already exists in the addTab state
  const clickedTabKeyExists = addTab.some(
    (tab: { key: string }) => tab.key === itemKey
  );
  const [messageApi, contextHolder] = message.useMessage();
  // Function to display a warning message
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Tabs full! Please clear tabs",
    });
  };
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={src} />}
        onClick={() =>
          addTab.length > 3 && !clickedTabKeyExists
            ? warning()
            : fetchByTerm({ title, itemKey, avatar })
        }
      >
        <Meta title={title} />
        <div>Artist: {artist}</div>
        <div>Category: {category}</div>
      </Card>
      {/* Context holder for displaying messages */}
      {contextHolder}
    </>
  );
};

export default MusicCard;
