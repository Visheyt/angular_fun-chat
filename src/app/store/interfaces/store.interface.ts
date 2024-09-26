import { User } from '../../chat/models/socket.interface';

export interface AppState {
  userState: UserState;
  usersListState: UsersListState;
}

export interface UserState {
  login: string;
  isUserLogin: boolean;
  password: string;
}

export interface UsersListState {
  activeUsers: User[];
  inactiveUsers: User[];
}
