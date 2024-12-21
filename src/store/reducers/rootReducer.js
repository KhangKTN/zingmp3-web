import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import appReducer from './appReducer'
import musicReducer from './musicReducer'

const generalConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...generalConfig,
    key: 'music'
    // whitelist: ['currentSong', 'isPlay']
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer)
})

export default rootReducer