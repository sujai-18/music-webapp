import axios from 'axios';
import store from '../redux/store';
import actions from '../redux/common/actions';

const iTunesAPI = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

export const fetchAlbums = async () => {
    try {
        const response = await axios.get(iTunesAPI);
        store.dispatch({
            type: actions.GET_ALBUMS_LIST_SUCCESS,
            payload: response.data.feed,
        })
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw new Error('Failed to fetch albums');
    }
};

export const fetchByTerm = async (params: { title: string; itemKey: string; }) => {
    store.dispatch({
        type: actions.ADD_TAB,
        payload: { title: params.title, key: params.itemKey },
    })
    try {
        const response = await axios.get(`https://itunes.apple.com/search?term=${params.title}`);
        store.dispatch({
            type: actions.GET_SELECTED_ALBUM_SUCCESS,
            payload: {
                list: response.data.results,
                key: params.itemKey,
            },
        })
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw new Error('Failed to fetch albums');
    }
};