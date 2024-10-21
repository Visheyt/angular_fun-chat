import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/store.interface';
import { userReducer } from './reducers/user.reducer';
import { usersListReducer } from './reducers/users-list.reducer';
import { chatReducer } from './reducers/chat.reducer';
import { messagesReducer } from './reducers/messages.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
  usersListState: usersListReducer,
  chatState: chatReducer,
  messagesState: messagesReducer,
};
