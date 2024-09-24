import { createReducer, on, props } from '@ngrx/store';
import { userActions } from '../actions/user.action';
import { UserState } from '../interfaces/user.interface';

export const initialState: UserState = {
  login: '',
  isUserLogin: false,
};

export const userReducer = createReducer(
  initialState,
  on(userActions.login, (state, { login }) => ({
    ...state,
    login,
    isUserLogin: true,
  }))
);
