export interface AppState {
  userState: UserState;
}

export interface UserState {
  login: string;
  isUserLogin: boolean;
}
