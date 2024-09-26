import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../chat/models/socket.interface';

export const usersListActions = createActionGroup({
  source: 'usersList',
  events: {
    activeUsers: props<{ users: User[] }>(),
    inactiveUsers: props<{ users: User[] }>(),
  },
});
