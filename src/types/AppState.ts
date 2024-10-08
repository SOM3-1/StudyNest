import { Session } from "@constants/sessions";

export interface AppState  {
    isLoggedIn: boolean;
    users: User[];
    loggedInUser?: User;
    sessions: Session[]
}

export interface User {
    fullName: string;
    email: string;
    major: string;
    password: string;
    iD: string
  }
  