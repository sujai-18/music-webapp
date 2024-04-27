import React from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { Table } from "antd";
import type { TableProps } from "antd";

interface MusicListProps {
  activeTab: string;
}
interface DataType {
  key: string;
  name: string;
  artist: number;
  album: string;
  time: string[];
}

const formatDuration: any = (durationInMillis: number) => {
  const totalSeconds = Math.floor(durationInMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MusicList: React.FC<MusicListProps> = ({ activeTab }) => {
  const selectedMusicList = useAppSelector(
    (state) => state.commonReducer.selectedMusicList
  );
  const activeTabList = selectedMusicList[activeTab];
  const screenHeight = document.getElementById("app")?.clientHeight || 700;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <a>{text}</a>,
    },
  ];
  const data: DataType[] = activeTabList?.map(
    (
      data: {
        trackName: any;
        collectionName: any;
        artistName: any;
        trackTimeMillis(trackTimeMillis: number): number;
      },
      index: number
    ) => ({
      key: index,
      name: data.trackName,
      artist: data.artistName,
      album: data.collectionName,
      time: formatDuration(data.trackTimeMillis),
    })
  );
  return (
    <>
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
        virtual
        scroll={{ y: screenHeight - 200 }}
      />
    </>
  );
};

export default MusicList;
