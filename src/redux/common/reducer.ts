import uniqid from 'uniqid';
import actions from './actions';

const initialState = {
    selectedMusicList: {},
    albumList: [],
    artistList: [],
    categoryList: [],
    addTab: [],
};
interface Album {
    title: string;
    artist: string;
    category: string;
    images: string[];
    key: string;
}

interface Artist {
    name: string;
}

interface Category {
    name: string;
}
interface Entry {
    [key: string]: any;
}

export default function commonReducer(state = initialState, action: { type: any; payload: any; }): any {
    switch (action.type) {
        case actions.GET_ALBUMS_LIST_SUCCESS:
            const entries = action.payload;
            const albumList: any = [];
            const artistList: any = [];
            const categoryList: any = [];
            Array.isArray(entries?.entry) && entries?.entry?.forEach((entry: Entry) => {
                const album: Album = {
                    title: entry['im:name'].label,
                    artist: entry['im:artist'].label,
                    category: entry.category.attributes.term,
                    images: entry['im:image'].map((img: { label: string }) => img.label),
                    key: uniqid(),
                };

                albumList.push(album);

                // Check if artist already exists in the artistList
                const existingArtist = artistList.find((artist: { name: string; }) => artist.name === album.artist);
                if (!existingArtist) {
                    const artistUrl = entry['im:artist']?.attributes?.href;
                    const artistImage = entry['im:image'].find((img: { label: string }) => img.label.includes('artist'));
                    artistList.push({ name: album.artist, url: artistUrl });
                }

                // Check if category already exists in the categoryList
                const existingCategory = categoryList.find((category: { name: string; }) => category.name === album.category);
                if (!existingCategory) {
                    categoryList.push({ name: album.category });
                }
            })
            return {
                ...state,
                albumList,
                artistList,
                categoryList,
            };
        case actions.SET_TYPE:
            return {
                ...state,
                musicType: action.payload,
            };
            case actions.ADD_TAB:
            return {
                ...state,
                addTab: [
                    ...state.addTab,
                    {
                        key: action.payload.key,
                        label: action.payload.title,
                      },
                ],
            };
            case actions.GET_SELECTED_ALBUM_SUCCESS:
            return {
                ...state,
                selectedMusicList: {
                    ...state.selectedMusicList,
                    [action.payload.key]: action.payload.list,
                },
            };
        default:
            return state;
    }
};
