import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/user.interface';
import { userReducer } from './reducers/user.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
};
