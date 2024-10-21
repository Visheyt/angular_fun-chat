import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Message } from '../../chat/models/socket.interface';

export const chatActions = createActionGroup({
  source: 'chat',
  events: {
    open: props<{ contactName: string; isOnline: boolean }>(),
    close: emptyProps(),
  },
});
