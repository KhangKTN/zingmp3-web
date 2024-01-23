import appReducer from "./appReducer";
import musicReducer from "./musicReducer";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const generalConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...generalConfig,
    key: 'music',
    whitelist: ['currentSong', 'isPlay']
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer)
})

export default rootReducer