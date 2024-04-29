export interface searchOption {
    value: string;
}
export interface songsList {
    [x: string]: any;
    audioUrl: string;
    id: string;
    status: boolean;
}
export interface currentSongsList {
    [x: string]: any;
    audioUrl: string;
    title: string;
}
export interface commonReducerStateType {
    addTab: any;
    selectedMusicList: any;
    playlistData: any;
    queueList: any;
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

export interface Album {
    title: string;
    artist: string;
    category: string;
    images: string[];
    key: string;
}

export interface Artist {
    name: string;
}

export interface Category {
    name: string;
}
export interface Entry {
    [key: string]: any;
}

export interface Song {
    audioUrl: string;
    title: string;
}

export interface MusicCardProps {
    src: string;
    title: string;
    artist: string;
    category: string;
    itemKey: string;
    avatar: string;
}

export interface MusicListProps {
    activeTab: string;
}

export interface DataType {
    key: string;
    name: string;
    artist: number;
    album: string;
    time: string[];
    data: any;
}