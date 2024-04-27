import React from "react";
import { Card } from "antd";
import { fetchByTerm } from "../../api/api";

interface MusicCardProps {
  src: string;
  title: string;
  artist: string;
  category: string;
  itemKey: string;
}
const { Meta } = Card;
const MusicCard: React.FC<MusicCardProps> = ({
  src,
  title,
  artist,
  category,
  itemKey,
}) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={src} />}
      onClick={() => fetchByTerm({ title, itemKey })}
    >
      <Meta title={title} />
      <div>Artist: {artist}</div>
      <div>Category: {category}</div>
    </Card>
  );
};

export default MusicCard;
