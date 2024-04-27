import actions from './actions';

const initialState = {
    musicList: {}
};

export default function commonReducer(state = initialState, action: { type: any; payload: any; }): any {
    switch (action.type) {
        case actions.GET_ALBUMS_LIST_SUCCESS:
            return {
                ...state,
                musicList: action.payload,
            };
        default:
            return state;
    }
};
