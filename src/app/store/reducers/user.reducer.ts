import { createReducer, on, props } from '@ngrx/store';
import { userActions } from '../actions/user.action';
import { UserState } from '../interfaces/store.interface';

export const initialState: UserState = {
  login: '',
  isUserLogin: false,
  password: '',
};

export const userReducer = createReducer(
  initialState,
  on(userActions.login, (state, { login, password }) => ({
    ...state,
    login,
    password,
    isUserLogin: true,
  })),
  on(userActions.logout, (state) => ({
    ...state,
    login: '',
    password: '',
    isUserLogin: false,
  }))
);
