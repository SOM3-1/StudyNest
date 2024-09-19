import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, User } from '@ourtypes/AppState';
import { generateUUID } from '@components/helpers/uuidGenerator';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['isLoggedIn', 'users', 'loggedInUser'],
  };

  const initialState : AppState = {
    isLoggedIn: false,
    users: [],
    loggedInUser: undefined,
  }

  const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      registerUser: (state, action: PayloadAction<{ fullName: string; email: string; major: string; password: string, iD:string }>) => {
        const { email, fullName, major, password, iD } = action.payload;
        const existingUser = state.users.find(user => user.email === email);
        if (!existingUser) {
          const newUser: User = {
            fullName,
            email,
            major,
            password,
            iD,
          };
          state.users.push(newUser);
          state.isLoggedIn = true;
          state.loggedInUser = newUser;
        }
      },
      loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
        const { email, password } = action.payload;
        const user = state.users.find(user => user.email === email && user.password === password);
        if (user) {
          state.isLoggedIn = true;
          state.loggedInUser = user;
        }
      },
      logoutUser: (state) => {
        state.isLoggedIn = false;
        state.loggedInUser = undefined;
      },
    }
  });

const persistedReducer = persistReducer(persistConfig, slice.reducer);
export {persistedReducer as appReducer};
export const { registerUser, loginUser, logoutUser } = slice.actions;
export type {AppState};