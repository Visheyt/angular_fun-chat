import { createReducer, on, props } from '@ngrx/store';
import { userActions } from '../actions/user.action';
import { UsersListState, UserState } from '../interfaces/store.interface';
import { usersListActions } from '../actions/users-list.action';

export const initialState: UsersListState = {
  activeUsers: [],
  inactiveUsers: [],
};

export const usersListReducer = createReducer(
  initialState,
  on(usersListActions.activeUsers, (state, { users }) => ({
    ...state,
    activeUsers: [...state.activeUsers, ...users],
  })),
  on(usersListActions.inactiveUsers, (state, { users }) => ({
    ...state,
    inactiveUsers: [...state.inactiveUsers, ...users],
  }))
);
