import React, { useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Spin, Tabs } from "antd";
import Album from "./album";
import { useAppSelector } from "../hooks/reduxhooks";
import MusicList from "./musicList";
import { TabsContainer } from "../styles/styledCss";
import actions from "../redux/common/actions";
import {
  HomeOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}
// Draggable tab node component
const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });
  // Styling for draggable tab
  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: "move",
  };
  // Rendering the draggable tab node
  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const MusicTabs: React.FC = () => {
  const dispatch = useDispatch();
  const { addTab, activeTabKey, loader, clearTabs } = useAppSelector(
    (state) => state.commonReducer
  );
  // State for tab items
  const [items, setItems] = useState([
    {
      key: "1",
      label: "Home",
      children: <Album />,
      icon: <HomeOutlined />,
    },
  ]);
  // Function to get children based on the active tab
  const getChildren = () => {
    const key = addTab[addTab.length - 1].key;
    if (key === "categories") {
      return <Album activeTab={"categories"} />;
    } else if (key === "artist") {
      return <Album activeTab={"categories"} />;
    }
    return <MusicList activeTab={addTab[addTab.length - 1].key} />;
  };
  // Function to get avatar based on the active tab
  const getAvatar = () => {
    const key = addTab[addTab.length - 1].key;
    if (key === "favourites") {
      return <HeartOutlined />;
    } else if (key === "queue") {
      return <UnorderedListOutlined />;
    } else if (key === "search") {
      return <SearchOutlined />;
    }
    return <Avatar src={addTab[addTab.length - 1]?.avatar} />;
  };
  // Effect to update tab items when addTab changes
  useEffect(() => {
    if (addTab.length) {
      setActiveKey(addTab[addTab.length - 1].key);
      setItems([
        ...items,
        {
          ...addTab[addTab.length - 1],
          children: getChildren(),
          icon: getAvatar(),
        },
      ]);
    }
  }, [addTab]);
  // Dnd-kit sensor for pointer events
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  // Function to handle drag end event
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  // Function to set active tab key
  const setActiveKey = (key: any) => {
    dispatch({
      type: actions.ACTIVE_TAB_KEY,
      payload: key,
    });
  };
  // Function to change tab
  const changeTab = (key: string) => {
    dispatch({
      type: actions.LOADER,
      payload: true,
    });
    setTimeout(() => {
      setActiveKey(key);
      dispatch({
        type: actions.LOADER,
        payload: false,
      });
    }, 100);
  };
  // Effect to handle clearing tabs
  useEffect(() => {
    if (clearTabs) {
      setActiveKey("1");
      setItems([
        {
          key: "1",
          label: "Home",
          children: <Album />,
          icon: <HomeOutlined />,
        },
      ]);
    }
  }, [clearTabs]);

  // Render loading spinner if loader is true
  if (loader) return <Spin fullscreen />;

  return (
    <TabsContainer>
      <Tabs
        items={items}
        activeKey={activeTabKey}
        onChange={(key) => changeTab(key)}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={items.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
    </TabsContainer>
  );
};

export default MusicTabs;
