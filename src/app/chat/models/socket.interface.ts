import { wsResponse } from '../../websocket/model/message.interface';

export interface usersListResponse extends wsResponse {
  payload: {
    users: User[];
  };
}

export interface User {
  login: string;
  isUserLogin: string;
}
