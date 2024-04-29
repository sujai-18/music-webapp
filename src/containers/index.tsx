import React, { useEffect } from "react";
import {
  HomeOutlined,
  NotificationOutlined,
  UserOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { fetchAlbums } from "../api/api";
import Album from "../components/album";
import "../styles/global.scss";
import { setType } from "../utils/helper";
import MusicTabs from "../components/tabs";
import {
  ContentContainer,
  HeaderContainer,
  MusicTrackerContainer,
  SiderContainer,
} from "../styles/styledCss";
import MusicPlayerApp from "../components/player/mediaPlayer";
import { ReactComponent as MusicIcon } from "../assets/svgs/music.svg";

const { Content, Sider } = Layout;
const sideBarItems = [
  {
    label: "Albums",
    key: "1",
  },
  // {
  //   label: "Artist",
  //   key: 'artist',
  // },
  // {
  //   label: "Categories",
  //   key: "categories",
  // },
  // {
  //   label: "Your Playlist",
  //   key: "playlist",
  // },
  {
    label: "Favourites",
    key: "favourites",
  },
  {
    label: "Queue",
    key: "queue",
  },
  {
    label: "Search",
    key: "search",
  },
  {
    label: "Clear Tabs",
    key: 'clear_tabs',
  },
];
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  HomeOutlined,
  HeartOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  DeleteOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: sideBarItems[index]?.label || "",
    onClick: () =>
      setType({
        title: sideBarItems[index]?.label,
        itemKey: sideBarItems[index]?.key,
      }),
  };
});

const Index: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <Layout>
      <SiderContainer>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <div className="title">
            <div>
              <MusicIcon />
            </div>
            <div>Music</div>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
      </SiderContainer>
      <Layout style={{ padding: "0 24px 24px" }}>
        <MusicTrackerContainer>
          <MusicPlayerApp />
        </MusicTrackerContainer>
        <ContentContainer>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <MusicTabs />
          </Content>
        </ContentContainer>
      </Layout>
    </Layout>
  );
};

export default Index;
