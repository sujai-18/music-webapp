import uniqid from 'uniqid';
import actions from './actions';
interface YourPlaylist {
    [key: string]: any[]; // Adjust 'any[]' to the actual type of your playlist items
  }
  interface YourStateType {
    addTab: any;
    selectedMusicList: any;
    playlistData: any;
    queueList: any;
    yourPlaylist: YourPlaylist;
    // other state properties
  }
const initialState = {
    selectedMusicList: {},
    albumList: [],
    artistList: [],
    categoryList: [],
    addTab: [],
    yourPlaylist: {},
    queueList: [],
    playlistModal: false,
    playlistData: [
        {title: 'Favourites', id: uniqid('playlist-')}
    ]
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

export default function commonReducer(state: YourStateType = initialState, action: { type: any; payload: any; }): any {
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
            case actions.ADD_TO_FAVOURITES:
                return {
                  ...state,
                  yourPlaylist: {
                    ...state.yourPlaylist,
                    [state.playlistData[0].id]: [
                      ...(state.yourPlaylist?.[state?.playlistData?.[0]?.id] || []), // Use spread operator to merge arrays
                      action.payload.favouriteList,
                    ],
                  },
                };
              
            case actions.ADD_TO_QUEUE:
            return {
                ...state,
                queueList: [...state.queueList, action.payload],
            };
            case actions.PLAYLIST_MODAL:
            return {
                ...state,
                playlistModal: action.payload,
            };
            case actions.CREATE_PLAYLIST:
            return {
                ...state,
                playlistData: [...state.playlistData, action.payload],
            };
        default:
            return state;
    }
};
