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
    activeUsers: users,
  })),
  on(usersListActions.inactiveUsers, (state, { users }) => ({
    ...state,
    inactiveUsers: users,
  })),
  on(usersListActions.disconnectUser, (state, { login }) => ({
    ...state,
    activeUsers: state.activeUsers.filter((user) => user.login !== login),
  })),
  on(usersListActions.addActiveUser, (state, { login }) => {
    const isActive = state.activeUsers.some((user) => user.login === login);
    const isInactive = state.inactiveUsers.some((user) => user.login === login);

    return {
      ...state,
      activeUsers: isActive
        ? state.activeUsers
        : [...state.activeUsers, { login, isLogined: true }],
      inactiveUsers: isInactive
        ? state.inactiveUsers.filter((user) => user.login !== login)
        : state.inactiveUsers,
    };
  }),
  on(usersListActions.addInactiveUser, (state, { login }) => {
    const isInactive = state.inactiveUsers.some((user) => user.login === login);

    return {
      ...state,
      activeUsers: state.activeUsers.filter((user) => user.login !== login),
      inactiveUsers: isInactive
        ? state.inactiveUsers
        : [...state.inactiveUsers, { login, isLogined: false }],
    };
  })
);
