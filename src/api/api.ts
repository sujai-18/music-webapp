import axios from 'axios';
import store from '../redux/store';
import actions from '../redux/common/actions';
import { checkForExistence } from '../utils/helper';

// iTunes API endpoint for fetching top albums
const iTunesAPI = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

// Function to dispatch loader action
function loader(payload: boolean) {
    store.dispatch({
        type: actions.LOADER,
        payload,
    })
}
// Function to fetch top albums from iTunes API
export const fetchAlbums = async () => {
    try {
        loader(true);
        const response = await axios.get(iTunesAPI);
        // Dispatch action to store fetched albums data in Redux store
        store.dispatch({
            type: actions.GET_ALBUMS_LIST_SUCCESS,
            payload: response.data.feed,
        })
    } catch (error) {
        // Dispatch loader action to hide loading spinner in case of error
        loader(false);
        console.error('Error fetching albums:', error);
        throw new Error('Failed to fetch albums');
    }
};

// Function to fetch albums by search term from iTunes API
export const fetchByTerm = async (params: { title: string; itemKey: string; avatar: string; }) => {
    if (!checkForExistence(params.itemKey)) {
        store.dispatch({
            type: actions.ADD_TAB,
            payload: { title: params.title, key: params.itemKey, avatar: params.avatar },
        })
    } else {
        store.dispatch({
            type: actions.ACTIVE_TAB_KEY,
            payload: params.itemKey,
        })
    }
    try {
        loader(true);
        const response = await axios.get(`https://itunes.apple.com/search?term=${params.title}`);
        // Dispatch action to store search results in Redux store
        store.dispatch({
            type: actions.GET_SELECTED_ALBUM_SUCCESS,
            payload: {
                list: response.data.results,
                key: params.itemKey,
            },
        })
    } catch (error) {
        loader(false);
        console.error('Error fetching albums:', error);
        // throw new Error('Failed to fetch albums');
    }
};

// Function to search music by term from iTunes API
export const searchMusicApi = async (params: { value: string; }) => {
    try {
        loader(true);
        const response = await axios.get(`https://itunes.apple.com/search?term=${params.value}`);
        // Dispatch action to store search results in Redux store
        store.dispatch({
            type: actions.SEARCH_RESULTS,
            payload: response.data.results,
        })
    } catch (error) {
        loader(false);
        console.error('Error fetching albums:', error);
        // throw new Error('Failed to fetch albums');
    }
};