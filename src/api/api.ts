import axios from 'axios';
import store from '../redux/store';
import actions from '../redux/common/actions';

const iTunesAPI = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

export const fetchAlbums = async () => {
    try {
        const response = await axios.get(iTunesAPI);
        store.dispatch({
            type: actions.GET_ALBUMS_LIST_SUCCESS,
            payload: response,
        })
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw new Error('Failed to fetch albums');
    }
};
