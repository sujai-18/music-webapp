import axios from 'axios';
import store from '../redux/store';
import actions from '../redux/common/actions';
import { checkForExistence } from '../utils/helper';

const iTunesAPI = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

function loader(payload: boolean) {
    store.dispatch({
        type: actions.LOADER,
        payload,
    })
}
export const fetchAlbums = async () => {
    try {
        loader(true);
        const response = await axios.get(iTunesAPI);
        store.dispatch({
            type: actions.GET_ALBUMS_LIST_SUCCESS,
            payload: response.data.feed,
        })
    } catch (error) {
        loader(false);
        console.error('Error fetching albums:', error);
        throw new Error('Failed to fetch albums');
    }
};

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

export const searchMusicApi = async (params: { value: string; }) => {
    try {
        loader(true);
        const response = await axios.get(`https://itunes.apple.com/search?term=${params.value}`);
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