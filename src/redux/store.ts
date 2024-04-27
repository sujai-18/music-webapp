import { combineReducers, createStore } from 'redux';
import reducers from './reducers';

const appReducer = combineReducers({ ...reducers });
const store = createStore(appReducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
