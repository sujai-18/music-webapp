import React, { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { Table } from "antd";
import type { TableProps } from "antd";
import { MusicListContainer } from "../styles/styledCss";

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
  console.log({ activeTabList });
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (text) => (
        <div style={{display: 'flex', justifyContent: 'space-between', flex: '1 0'}}>
          <a>{text}</a>
          <div style={{display: 'flex', gap: '10px'}}>
            <div onClick={() => alert("F")}>F</div>
            <div onClick={() => alert("Q")}>Q</div>
          </div>
        </div>
      ),
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      width: "30%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      width: "50%",
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
    <MusicListContainer>
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
        virtual
        scroll={{ y: screenHeight - 200 }}
        bordered={false}
      />
    </MusicListContainer>
  );
};

export default MusicList;
