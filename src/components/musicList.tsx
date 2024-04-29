import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { Avatar, Space, Table } from "antd";
import type { Input, TableProps } from "antd";
import { MusicListContainer } from "../styles/styledCss";
import { addToFavourites, addToQueue, playSong } from "../utils/helper";
import Search from "./shared/search";
import { HeartTwoTone } from "@ant-design/icons";
import store from "../redux/store";
import actions from "../redux/common/actions";
import { ReactComponent as QueueIcon } from "../assets/svgs/queue.svg";
import { PlayCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCirclePlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
interface MusicListProps {
  activeTab: string;
}
interface DataType {
  key: string;
  name: string;
  artist: number;
  album: string;
  time: string[];
  data: any;
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
  const { queueList, searchList, songsList, favouriteList } = useAppSelector(
    (state) => state.commonReducer
  );
  const activeTabList = selectedMusicList[activeTab];
  const screenHeight = document.getElementById("app")?.clientHeight || 700;
  useEffect(() => {
    if (activeTabList?.length || searchList?.length || favouriteList?.length) {
      store.dispatch({
        type: actions.UPDATE_SONG_LIST,
        payload: [...(activeTabList || []), ...searchList, ...favouriteList],
      });
    }
  }, [activeTabList, searchList, favouriteList]);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a?.name?.length - b?.name?.length,
      sortDirections: ["descend"],
      render: (text, data) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: "1 0",
          }}
        >
          <Space>
            <div className="relative" onClick={() => playSong(data.data)}>
              <Avatar shape="square" size={32} src={data.data.artworkUrl100} />
              <div className="absolute">
                <PlayCircleOutlined />
              </div>
            </div>
            <a onClick={() => playSong(data.data)}>{text}</a>
          </Space>

          <Space style={{ display: "flex", gap: "10px" }}>
            <div
              onClick={() => addToFavourites(data.data)}
              className="favourites"
            >
              {favouriteList?.find(
                (favData: { trackId: any }) =>
                  favData.trackId === data.data.trackId
              )?.status ? (
                <FontAwesomeIcon icon={faHeartCircleMinus} />
              ) : (
                <FontAwesomeIcon icon={faHeartCirclePlus} />
              )}
              {/* <HeartTwoTone
                twoToneColor={
                  favouriteList?.find(
                    (favData: { trackId: any }) =>
                      favData.trackId === data.data.trackId
                  )?.status
                    ? "#000000"
                    : "#eb2f96"
                }
              /> */}
            </div>
            <div onClick={() => addToQueue(data.data)} className="queue">
              <QueueIcon width={"20"} height={"20"} />
            </div>
          </Space>
        </div>
      ),
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      width: "30%",
      responsive: ["lg"],
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a?.name?.length - b?.name?.length,
      sortDirections: ["descend"],
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      width: "50%",
      responsive: ["lg"],
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a?.name?.length - b?.name?.length,
      sortDirections: ["descend"],
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "10%",
      responsive: ["md"],
      render: (text) => <a>{text}</a>,
    },
  ];
  const list =
    activeTab === "favourites"
      ? favouriteList
      : activeTab === "search"
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      </MusicListContainer>
    </>
  );
};

export default MusicList;
