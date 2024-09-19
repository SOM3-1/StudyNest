export interface AppState  {
    isLoggedIn: boolean;
    users: User[];
    loggedInUser?: User;
}

export interface User {
    fullName: string;
    email: string;
    major: string;
    password: string;
    iD: string
  }
  