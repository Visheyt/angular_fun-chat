import { wsResponse } from '../../websocket/model/message.interface';

export interface usersListResponse extends wsResponse {
  payload: {
    users: User[];
  };
}

export interface User {
  login: string;
  isLogined: boolean;
}

export interface messagesListResponse extends wsResponse {
  payload: {
    messages: Message[];
  };
}

export interface messageResponse extends wsResponse {
  payload: {
    message: Message;
  };
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

export interface userExternalLogin extends wsResponse {
  payload: {
    user: User;
  };
}

export interface messageDeletion extends wsResponse {
  payload: {
    message: {
      id: string;
    };
  };
}

export interface messageEdition extends wsResponse {
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
}

export interface messageReaded extends wsResponse {
  payload: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
}
