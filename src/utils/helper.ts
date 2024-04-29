import uniqid from "uniqid";
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

export function setType(data: any) {
  if (data.itemKey === 'clear_tabs') {
    store.dispatch({
      type: actions.CLEAR_TABS,
      payload: true,
    })
    setTimeout(() => {
      store.dispatch({
        type: actions.CLEAR_TABS,
        payload: false,
      })
    }, 100)
  } else {
    if (!checkForExistence(data.itemKey) && data.itemKey !== '1') {
      if (data.itemKey === 'playlist') {
        store.dispatch({
          type: actions.PLAYLIST_MODAL,
          payload: true,
        })
      } else {
        store.dispatch({
          type: actions.ADD_TAB,
          payload: { title: data.title, key: data.itemKey },
        })
      }
    }
    store.dispatch({
      type: actions.ACTIVE_TAB_KEY,
      payload: data.itemKey,
    })
  }
}

export function addToFavourites(data: object) {
  store.dispatch({
    type: actions.ADD_TO_FAVOURITES,
    payload: {
      favouriteList: data,
    },
  })
}

export function addToQueue(data: object) {
  store.dispatch({
    type: actions.ADD_TO_QUEUE,
    payload: data,
  })
}

export function createPlaylist(data: string) {
  store.dispatch({
    type: actions.CREATE_PLAYLIST,
    payload: { title: data, id: uniqid('playlist') },
  })
}

export function checkForExistence(itemKey: any) {
  const { addTab } = store.getState().commonReducer;
  const doesExists = addTab.some((tab: { key: any; }) => tab.key === itemKey);
  return doesExists;
}

export function playSong(data: any) {
  store.dispatch({
    type: actions.PLAY_SONG,
    payload: { audioUrl: data?.previewUrl, id: data?.trackId },
  })
}