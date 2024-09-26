import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/store.interface';

const usersListState = (state: AppState) => state.usersListState;

export const selectActiveUsers = createSelector(
  usersListState,
  (state) => state.activeUsers
);

export const selectInactiveUsers = createSelector(
  usersListState,
  (state) => state.inactiveUsers
);
