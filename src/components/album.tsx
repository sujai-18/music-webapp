import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import MusicCard from "./shared/musicCard";
import { MusicCardContainer } from "../styles/styledCss";
import { Spin } from "antd";
import { FixedSizeGrid as Grid } from "react-window";
import { calculateGridSettings } from "../utils/helper";

const Album: React.FC<any> = ({ activeTab }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { albumList, loader } = useAppSelector((state) => state.commonReducer);
  // Effect to calculate screen width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const width =
        document.getElementsByClassName("ant-layout-sider")[0]?.clientWidth ||
        0;
      setScreenWidth(window.innerWidth - width);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial calculation
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Calculate grid settings based on screen width and album list size
  const { numColumns, columnWidth, containerWidth, rowCount, rowHeight } =
    calculateGridSettings({
      screenWidth,
      listSize: albumList.length,
      rowHeight: 315,
    });
  // Callback memoized function for rendering a grid cell
  const Cell: React.FC<any> = useCallback(
    ({ columnIndex, key, rowIndex, style }: any) => {
      // Calculate the index of the album in the album list
      const itemIndex = rowIndex * numColumns + columnIndex;
      const album = albumList[itemIndex];
      return (
        // Renders a Virtual List
        <div key={key} style={{ ...style, padding: "1px" }}>
          {album && (
            <MusicCard
              title={album.title}
              artist={album.artist}
              category={album.category}
              src={album.images?.[2]} // Using the third image for highest clarity available in the images array
              itemKey={album.key}
              avatar={album.images[2]}
            />
          )}
        </div>
      );
    },
    [albumList, numColumns]
  );

  if (loader) return <Spin fullscreen />;

  return (
    <MusicCardContainer>
      <Grid
        columnCount={numColumns}
        columnWidth={columnWidth}
        height={window.innerHeight}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={containerWidth}
      >
        {Cell}
      </Grid>
    </MusicCardContainer>
  );
};

export default Album;
