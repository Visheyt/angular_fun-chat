import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/user.interface';

const userState = (state: AppState) => state.userState;

export const selectUserStatus = createSelector(
  userState,
  (state) => state.isUserLogin
);
export const selectUser = createSelector(userState, (state) => state);

export const selectUserName = createSelector(userState, (state) => state.login);
