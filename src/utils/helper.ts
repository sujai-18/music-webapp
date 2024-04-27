import actions from "../redux/common/actions";
import store from "../redux/store";

interface GridSettingsParams {
    screenWidth: number;
    itemWidth?: number;
    containerHeight?: number;
    listSize?: number;
    rowHeight?: number;
  }
  
  export function calculateGridSettings({
    screenWidth,
    itemWidth = 370,
    containerHeight = 400,
    listSize = 0,
    rowHeight = 150,
  }: GridSettingsParams) {
    let numColumns, columnWidth, rowCount, height;
    numColumns = Math.floor(screenWidth / itemWidth);
    columnWidth = itemWidth;
    rowCount = Math.ceil(listSize / numColumns);
    height = Math.min(containerHeight, rowCount * rowHeight);
  
    const containerWidth = numColumns * itemWidth;
  
    return {
      numColumns,
      columnWidth,
      containerWidth,
      containerHeight,
      rowCount,
      height,
      rowHeight,
    };
  }
  
  export function setType(payload: string) {
    store.dispatch({
        type: actions.SET_TYPE,
        payload,
    })
  }