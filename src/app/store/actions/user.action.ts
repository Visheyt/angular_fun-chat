import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ login: string; password: string }>(),
    logout: emptyProps(),
  },
});
