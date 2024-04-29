import uniqid from 'uniqid';
import actions from './actions';
// Getting the 'favourites' item from localStorage or initializing it as an empty array if it doesn't exist
let favouriteList: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');

interface YourPlaylist {
    [key: string]: any[];
}
interface searchOption {
    value: string;
}
interface songsList {
    [x: string]: any;
    audioUrl: string;
    id: string;
    status: boolean;
}
interface currentSongsList {
    [x: string]: any;
    audioUrl: string;
    title: string;
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
    songsList: currentSongsList[],
    queueListUrl: songsList[],
    currentIndex: any,
    favouriteList: any,
    activeTabKey: any,
    loader: boolean,
    clearTabs: boolean,
    messageContent: string;
}
// Define the default URL for songs
const defaultUrl =
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/10/01/d1/1001d1ed-9ba0-0728-d1f1-88a2af450e14/mzaf_10159851443471051651.plus.aac.p.m4a";
// Define the initial state of the reducer
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
            title: 'taylor',
        }
    ],
    queueListUrl: [],
    currentIndex: '',
    favouriteList: favouriteList,
    activeTabKey: "1",
    loader: false,
    clearTabs: false,
    messageContent: '',
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
                    categoryList.push(album);
                }
            })

            return {
                ...state,
                albumList,
                artistList,
                categoryList,
                searchOptions: albumList?.map((data: { title: any; }) => ({ value: data?.title })),
                loader: false,
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
                        avatar: action.payload.avatar,
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
                loader: false,
            };
        case actions.ADD_TO_FAVOURITES:
            const findFavData = state.favouriteList.find((data: { trackId: any; }) => data.trackId === action.payload.favouriteList.trackId);
            const updateFavList = findFavData ? state.favouriteList.filter((data: { trackId: any; }) => data.trackId !== action.payload.favouriteList.trackId) : [...state.favouriteList, { ...action.payload.favouriteList, status: true, audioUrl: action.payload.favouriteList.previewUrl }]
            localStorage.setItem('favourites', JSON.stringify(updateFavList));
            return {
                ...state,
                yourPlaylist: {
                    ...state.yourPlaylist,
                    [state.playlistData[0].id]: [
                        ...(state.yourPlaylist?.[state?.playlistData?.[0]?.id] || []),
                        { ...action.payload.favouriteList, status: true },
                    ],
                },
                favouriteList: updateFavList,
                messageContent: updateFavList.length > state.favouriteList.length ? 'Music added to Favourite List !' : 'Music removed from Favourite List !',
            };
        case actions.ADD_TO_QUEUE:
            // Check if the track id already exists in the queueList
            const isTrackInQueue = state.queueList.some((item: { trackId: any; }) => item.trackId === action.payload.trackId);

            // If the track is not already in the queueList, add it
            if (!isTrackInQueue) {
                return {
                    ...state,
                    queueList: [...state.queueList, action.payload],
                    queueListUrl: [
                        ...state.queueListUrl,
                        { audioUrl: action.payload.previewUrl, id: action.payload.trackId, status: false }
                    ],
                    messageContent: 'Music added to Queue List !',
                };
            } else {
                // If the track is already in the queueList, remove it
                return {
                    ...state,
                    queueList: state.queueList.filter((item: { trackId: any; }) => item.trackId !== action.payload.trackId),
                    queueListUrl: state.queueListUrl.filter(item => item.id !== action.payload.trackId),
                    messageContent: 'Music removed from Queue List !',
                };
            }
        case actions.UPDATE_QUEUE:
            const findData: any = [...state.queueListUrl]?.find((data) => !data?.status);
            const updatedQueueListUrl = [...state.queueListUrl].map((data) => {
                if (findData.id === data.id) {
                    return { ...data, status: true }
                }
                return data;
            })
            return {
                ...state,
                queueListUrl: updatedQueueListUrl,
            };
        case actions.PLAYLIST_MODAL:
            return {
                ...state,
                playlistModal: action.payload,
            };
        case actions.CREATE_PLAYLIST:
            return {
                ...state,
                playlistData: [...state.playlistData, { ...action.payload, audioUrl: action.payload.previewUrl }],
            };
        case actions.SEARCH_RESULTS:
            return {
                ...state,
                searchList: action.payload,
                loader: false,
            };
        case actions.PLAY_SONG:
            return {
                ...state,
                songClicked: uniqid(),
                currentIndex: state.songsList.findIndex((data) => data.id === action.payload.id),
            };
        case actions.UPDATE_SONG_LIST:
            const uniqueTrackIds = new Set(state.songsList.map(song => song.id));
            // Remove duplicated song before updating the State
            const updatedSongs = action.payload
                .filter((data: { trackId: any }) => !uniqueTrackIds.has(data.trackId))
                .map((data: {
                    trackName: string;
                    trackId: any;
                    previewUrl: string;
                }) => ({
                    audioUrl: data?.previewUrl || defaultUrl,
                    id: data.trackId,
                    title: data.trackName
                }));

            return {
                ...state,
                songsList: [...state.songsList, ...updatedSongs],
            };
        case actions.ACTIVE_TAB_KEY:
            return {
                ...state,
                activeTabKey: action.payload
            };
        case actions.LOADER:
            return {
                ...state,
                loader: action.payload
            };
        case actions.CLEAR_TABS:
            return {
                ...state,
                clearTabs: action.payload,
                addTab: [],
                messageContent: action.payload ? 'Tabs cleared !' : '',
            };
        case actions.MESSAGE_CONTENT:
            return {
                ...state,
                messageContent: action.payload,
            };
        default:
            return state;
    }
};
