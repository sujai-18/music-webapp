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
import { Tabs } from "antd";
import Album from "./album";
import { useAppSelector } from "../hooks/reduxhooks";
import MusicList from "./musicList";
import { TabsContainer } from "../styles/styledCss";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: "move",
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const MusicTabs: React.FC = () => {
  const addTab = useAppSelector((state) => state.commonReducer.addTab);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [items, setItems] = useState([
    {
      key: "1",
      label: "Home",
      children: <Album />,
    },
  ]);
  useEffect(() => {
    if (addTab.length) {
      setActiveKey(addTab[addTab.length - 1].key);
      setItems([
        ...items,
        {
          ...addTab[addTab.length - 1],
          children: <MusicList activeTab={addTab[addTab.length - 1].key} />,
        },
      ]);
    }
  }, [addTab]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <TabsContainer>
      <Tabs
        items={items}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
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
