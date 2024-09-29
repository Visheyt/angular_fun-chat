import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const chatActions = createActionGroup({
  source: 'chat',
  events: {
    open: props<{ contactName: string; isOnline: boolean }>(),
    close: emptyProps(),
  },
});
