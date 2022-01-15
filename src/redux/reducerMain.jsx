import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {authTokenSlice} from '../modAuth/slices'

const persistConfigMain = {
  key: 'root',
  storage,
  blacklist: ['alerts', 'authToken']
}

const persistConfigAuthToken = {
  key: 'authToken',
  storage,
  blacklist: ['token']
}

const rootReducerMain = combineReducers({
  authToken: persistReducer(persistConfigAuthToken, authTokenSlice.reducer),
})

export const persistedReducerMain = persistReducer(persistConfigMain, rootReducerMain)
