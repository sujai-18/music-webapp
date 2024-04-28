import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { Space, Table } from "antd";
import type { Input, TableProps } from "antd";
import { MusicListContainer } from "../styles/styledCss";
import { addToFavourites, addToQueue, playSong } from "../utils/helper";
import Search from "./shared/search";
import { HeartTwoTone } from '@ant-design/icons';
import store from "../redux/store";
import actions from "../redux/common/actions";

interface MusicListProps {
  activeTab: string;
}
interface DataType {
  key: string;
  name: string;
  artist: number;
  album: string;
  time: string[];
  data: object;
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
  const yourPlaylist = useAppSelector(
    (state) => state.commonReducer.yourPlaylist
  );
  const { queueList, searchList } = useAppSelector(
    (state) => state.commonReducer
  );
  const activeTabList = selectedMusicList[activeTab];
  const screenHeight = document.getElementById("app")?.clientHeight || 700;
  console.log({ activeTabList, yourPlaylist, queueList });
  useEffect(() => {
    if (activeTabList?.length) {
      store.dispatch({
        type: actions.UPDATE_SONG_LIST,
        payload: activeTabList,
      })
    }
  }, [activeTabList?.length])
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (text, data) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: "1 0",
          }}
        >
          <a onClick={() => playSong(data.data)}>{text}</a>
          <Space style={{ display: "flex", gap: "10px" }}>
            <div onClick={() => addToFavourites(data.data)}><HeartTwoTone twoToneColor="#eb2f96" /></div>
            <div onClick={() => addToQueue(data.data)}>Q</div>
          </Space>
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
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
  ];
  const list =
    activeTab === "search"
      ? searchList
      : activeTab === "queue"
        ? queueList
        : yourPlaylist?.[activeTab] || activeTabList;
  const data: DataType[] = list?.map(
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
      data,
    })
  );
  const [value, setValue] = useState<string>("");

  return (
    <>
      {activeTab === "search" ? (
        <>
        <Search />
        </>
      ) : null}
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
    </>
  );
};

export default MusicList;
