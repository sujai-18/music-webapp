import React, { useEffect } from "react";
import {
  HomeOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { fetchAlbums } from "../api/api";
import "../styles/global.scss";
import { setType } from "../utils/helper";
import MusicTabs from "../components/tabs";
import {
  ContentContainer,
  MusicTrackerContainer,
  SiderContainer,
} from "../styles/styledCss";
import MusicPlayerApp from "../components/player/mediaPlayer";
import { ReactComponent as MusicIcon } from "../assets/svgs/music.svg";

const { Content, Sider } = Layout;
// Array of sidebar items
const sideBarItems = [
  {
    label: "Albums",
    key: "1",
  },
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
    key: "clear_tabs",
  },
];
// Generating menu items
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
  // Fetching theme tokens from Ant Design
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Fetch albums on component mount
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
