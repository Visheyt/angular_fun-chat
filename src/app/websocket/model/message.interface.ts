export interface Auth {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}
export type WsMessage =
  | 'USER_LOGIN'
  | 'ERROR'
  | 'USER_LOGOUT'
  | 'USER_EXTERNAL_LOGIN'
  | 'USER_EXTERNAL_LOGOUT'
  | 'USER_ACTIVE'
  | 'USER_INACTIVE'
  | 'MSG_SEND'
  | 'MSG_FROM_USER'
  | 'MSG_DELIVER'
  | 'MSG_READ'
  | 'MSG_DELETE'
  | 'MSG_EDIT'
  | 'ERROR';

export interface wsResponse {
  id: string | null;
  type: string;
  payload: {};
}

export interface userMessageResponse extends wsResponse {
  payload: {
    user: {
      login: string;
      isUserLogin: boolean;
    };
  };
}
