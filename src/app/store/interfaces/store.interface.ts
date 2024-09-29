import { Message, User } from '../../chat/models/socket.interface';

export interface AppState {
  userState: UserState;
  usersListState: UsersListState;
  chatState: ChatState;
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

export interface ChatState {
  isOpen: boolean;
  contactName: string;
  isOnline: boolean;
  messages: Message[];
}
