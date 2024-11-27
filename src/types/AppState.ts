import { Session } from "@constants/sessions";

export interface NetworkState {
    isConnected: boolean;
  }

export interface AppState  {
    isLoggedIn: boolean;
    users: User[];
    loggedInUser?: User;
    sessions: Session[]
    network: NetworkState;
}

export interface User {
    fullName: string;
    email: string;
    major: string;
    password: string;
    iD: string,
    sessions: string[];
  }
  