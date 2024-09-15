import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '@ourtypes/AppState';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [], //add the keys to be stored
  };

  const initialState : AppState = {

  }

  const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
    }
  });

const persistedReducer = persistReducer(persistConfig, slice.reducer);
export {persistedReducer as appReducer};
export type {AppState};