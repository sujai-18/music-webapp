import React, { Suspense, lazy, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { Avatar, Space, Spin, Table } from "antd";
import type { Input, TableProps } from "antd";
import { MusicListContainer } from "../styles/styledCss";
import { addToFavourites, addToQueue, playSong } from "../utils/helper";
import actions from "../redux/common/actions";
import { ReactComponent as QueueIcon } from "../assets/svgs/queue.svg";
import { PlayCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCirclePlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { MusicListProps, DataType } from "../utils/interface";

const formatDuration: any = (durationInMillis: number) => {
  const totalSeconds = Math.floor(durationInMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
const Search = lazy(() => import("./shared/search"));
const MusicList: React.FC<MusicListProps> = ({ activeTab }) => {
  const dispatch = useDispatch();
  const selectedMusicList = useAppSelector(
    (state) => state.commonReducer.selectedMusicList
  );
  const { queueList, searchList, favouriteList } = useAppSelector(
    (state) => state.commonReducer
  );
  const activeTabList = selectedMusicList[activeTab];
  const screenHeight = document.getElementById("app")?.clientHeight || 700;
  // Updating the song list based on the active tab
  useEffect(() => {
    if (activeTabList?.length || searchList?.length || favouriteList?.length) {
      dispatch({
        type: actions.UPDATE_SONG_LIST,
        payload: [...(activeTabList || []), ...searchList, ...favouriteList],
      });
    }
  }, [activeTabList, searchList, favouriteList]);
  // Columns configuration for the table
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      showSorterTooltip: { target: "sorter-icon" },
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
      showSorterTooltip: { target: "sorter-icon" },
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
      showSorterTooltip: { target: "sorter-icon" },
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
  // Mapping data to the table format
  const list =
    activeTab === "favourites"
      ? favouriteList
      : activeTab === "search"
        ? searchList
        : activeTab === "queue"
          ? queueList
          : activeTabList;
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
  // Rendering the component
  return (
    <>
      {/* Rendering the search component */}
      {activeTab === "search" ? (
        <Suspense fallback={<Spin fullscreen />}>
          <Search />
        </Suspense>
      ) : null}
      {/* Rendering the table */}
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
