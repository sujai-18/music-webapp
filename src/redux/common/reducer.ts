import uniqid from 'uniqid';
import actions from './actions';
interface YourPlaylist {
    [key: string]: any[];
}
interface searchOption {
    value: string;
}
interface songsList {
    audioUrl: string;
}
interface YourStateType {
    addTab: any;
    selectedMusicList: any;
    playlistData: any;
    queueList: any;
    yourPlaylist: YourPlaylist;
    searchList: any,
    searchOptions: searchOption[],
    songClicked: string,
    songsList: songsList[],
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
        { title: 'Favourites', id: uniqid('playlist-') }
    ],
    searchList: [],
    searchOptions: [],
    songClicked: '',
    songsList: [
        {
            audioUrl:
              "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/10/01/d1/1001d1ed-9ba0-0728-d1f1-88a2af450e14/mzaf_10159851443471051651.plus.aac.p.m4a",
          }
    ],
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
            console.log({ albumList });

            return {
                ...state,
                albumList,
                artistList,
                categoryList,
                searchOptions: albumList?.map((data: { title: any; }) => ({ value: data?.title }))
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
                        ...(state.yourPlaylist?.[state?.playlistData?.[0]?.id] || []),
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
        case actions.SEARCH_RESULTS:
            return {
                ...state,
                searchList: action.payload,
            };
        case actions.PLAY_SONG:
            return {
                ...state,
                songClicked: action.payload.id,
                songsList: [action.payload.audioUrl, ...state.songsList],
            };
        case actions.UPDATE_SONG_LIST:
            return {
                ...state,
                songClicked: action.payload.id,
                songsList: [...state.songsList, ...action.payload.map((data: { previewUrl: string; }) => ({ audioUrl: data.previewUrl }))],
            };
        default:
            return state;
    }
};
