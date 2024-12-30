import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, User } from '@ourtypes/AppState';
import { dummyUsers } from '@constants/users';
import { generateRandomSessions } from '@components/helpers/createSessions';
import { generateUUID } from '@components/helpers/uuidGenerator';
import { Session } from '@constants/sessions';
import { trackSessionCreation, trackSessionJoin, trackSessionLeave, trackSessionRemoval, trackUserRegistration } from 'src/analytics/trackEvent';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn', 'users', 'loggedInUser', "sessions"],
};

const initialState: AppState = {
  isLoggedIn: false,
  users: [],
  loggedInUser: undefined,
  sessions: [],
  network: { isConnected: true }
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    initializeSessions: (state) => {
      if (state.sessions.length === 0) {
        state.sessions = generateRandomSessions();
      }
    },
    
    initializeUsers: (state) => {
      if (state.users.length === 0) {
        state.users = dummyUsers;
        dummyUsers.forEach((user: User) => trackUserRegistration(user))
      }
    },

    registerUser: (state, action: PayloadAction<{ fullName: string; email: string; major: string; password: string, iD: string }>) => {
      const { email, fullName, major, password, iD } = action.payload;
      const existingUser = state.users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (!existingUser) {
        const newUser: User = {
          fullName,
          email,
          major,
          password,
          iD,
          sessions: []
        };
        state.users.push(newUser);
        state.isLoggedIn = true;
        state.loggedInUser = newUser;
        trackUserRegistration(newUser)
      }
    },

    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
      if (user) {
        state.isLoggedIn = true;
        state.loggedInUser = user;
      }
    },

    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.loggedInUser = undefined;
    },
    
    addStudySession: (state, action: PayloadAction<{ sessionTitle: string; description: string; from: string; to: string; location: string; major: string; participantLimit: number }>) => {
      const { sessionTitle, description, from, to, location, major, participantLimit } = action.payload;
      if (state.loggedInUser) {

        const user = state.users.find(user => user.iD === state.loggedInUser?.iD);
        const userName = user?.fullName || 'Unknown';

        const newSession: Session = {
          sessionId: generateUUID(),
          sessionTitle,
          description,
          from,
          to,
          location,
          major,
          participantLimit,
          createdBy: state.loggedInUser.iD,
          sessionMembers: []
        };
        state.sessions.push(newSession);
        trackSessionCreation(newSession, userName)
      }
    },

    removeStudySession: (state, action: PayloadAction<{ sessionId: string }>) => {
      const { sessionId } = action.payload;
      const user = state.users.find(user => user.iD === state.loggedInUser?.iD);
      const userName = user?.fullName || 'Unknown';
      state.sessions = state.sessions.filter(session => session.sessionId !== sessionId || session.createdBy !== state.loggedInUser?.iD);
      trackSessionRemoval(sessionId, state.loggedInUser?.iD || '', userName);
    },

    enrollInStudySession: (state, action: PayloadAction<{ sessionId: string }>) => {
      const { sessionId } = action.payload;
      const session = state.sessions.find(session => session.sessionId === sessionId);
      if (session && session.sessionMembers.length < session?.participantLimit && state.loggedInUser) {
        
        session.sessionMembers.push(state.loggedInUser.iD);

        const user = state.users.find(user => user.iD === state.loggedInUser?.iD);
        const userName = user?.fullName || 'Unknown';
        if (user) {
          user.sessions.push(sessionId);
        }
        trackSessionJoin(sessionId, state.loggedInUser.iD || '', userName);
      }
    },

    leaveStudySession: (state, action: PayloadAction<{ sessionId: string }>) => {
      const { sessionId } = action.payload;
      const session = state.sessions.find(session => session.sessionId === sessionId);
      if (session && state.loggedInUser) {
        session.sessionMembers = session.sessionMembers.filter(memberId => memberId !== state.loggedInUser?.iD);


        const user = state.users.find(user => user.iD === state.loggedInUser?.iD);
        const userName = user?.fullName || 'Unknown';
        if (user) {
          user.sessions = user.sessions.filter(sId => sId !== sessionId);
        }
        trackSessionLeave(sessionId, state.loggedInUser.iD, userName);
      }
    },
    setNetworkStatus: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      state.network.isConnected = action.payload.isConnected;
    },
  }
});

const persistedReducer = persistReducer(persistConfig, slice.reducer);
export { persistedReducer as appReducer };
export const { registerUser, loginUser, logoutUser, addStudySession, removeStudySession, enrollInStudySession, leaveStudySession, initializeSessions, initializeUsers, setNetworkStatus } = slice.actions;
export type { AppState };