import { createActionGroup, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ login: string }>(),
  },
});
