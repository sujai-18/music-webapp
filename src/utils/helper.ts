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
/**
 * Calculates and returns grid settings based on provided parameters.
 * @param screenWidth Width of the screen
 * @param itemWidth Width of each grid item
 * @param containerHeight Height of the grid container
 * @param listSize Number of items in the list
 * @param rowHeight Height of each row in the grid
 * @returns Object containing calculated grid settings
 */

export function calculateGridSettings({
  screenWidth,
  itemWidth = 265,
  containerHeight = 1100,
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

/**
 * Sets the type of action based on the provided data.
 * @param data Object containing item key and title
 */
export function setType(data: any) {
  const restrictedNewTabs = ['favourites', 'queue', 'search'];
  const {addTab} = store.getState().commonReducer;
  if (restrictedNewTabs.includes(data.itemKey) && addTab.length > 2) {
    store.dispatch({
      type: actions.MESSAGE_CONTENT,
      payload: `Please clear tabs to see ${data.itemKey}!`,
    })
  } else if (data.itemKey === 'clear_tabs') {
    // Clear tabs action
    store.dispatch({
      type: actions.CLEAR_TABS,
      payload: true,
    })
    // Delayed clearing of tabs state
    setTimeout(() => {
      store.dispatch({
        type: actions.CLEAR_TABS,
        payload: false,
      })
    }, 100)
  } else {
    if (!checkForExistence(data.itemKey) && data.itemKey !== '1') {
      // Add tab action
      store.dispatch({
        type: actions.ADD_TAB,
        payload: { title: data.title, key: data.itemKey },
      })
    }
    // Set active tab key action
    store.dispatch({
      type: actions.ACTIVE_TAB_KEY,
      payload: data.itemKey,
    })
  }
}

/**
 * Dispatches an action to add a song to the favorites list.
 * @param data Object containing song data
 */

export function addToFavourites(data: object) {
  store.dispatch({
    type: actions.ADD_TO_FAVOURITES,
    payload: {
      favouriteList: data,
    },
  })
}
/**
 * Dispatches an action to add a song to the queue.
 * @param data Object containing song data
 */
export function addToQueue(data: object) {
  store.dispatch({
    type: actions.ADD_TO_QUEUE,
    payload: data,
  })
}
/**
 * Dispatches an action to create a new playlist.
 * @param data Title of the new playlist
 */
export function createPlaylist(data: string) {
  store.dispatch({
    type: actions.CREATE_PLAYLIST,
    payload: { title: data, id: uniqid('playlist') },
  })
}
/**
 * Checks if a tab with the provided item key already exists.
 * @param itemKey Key of the tab to check
 * @returns Boolean indicating if the tab exists
 */
export function checkForExistence(itemKey: any) {
  const { addTab } = store.getState().commonReducer;
  const doesExists = addTab.some((tab: { key: any; }) => tab.key === itemKey);
  return doesExists;
}

/**
 * Dispatches an action to play the selected song.
 * @param data Object containing song data
 */
export function playSong(data: any) {
  store.dispatch({
    type: actions.PLAY_SONG,
    payload: { audioUrl: data?.previewUrl, id: data?.trackId },
  })
}