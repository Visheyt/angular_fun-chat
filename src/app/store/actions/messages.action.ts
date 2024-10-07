import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Message } from '../../chat/models/socket.interface';

export const messagesActions = createActionGroup({
  source: 'chat',
  events: {
    addMessages: props<{ contact: string; messages: Message[] }>(),
    deleteAllMessages: emptyProps(),
    addIncomingMessage: props<{ contact: string; message: Message }>(),
    addOutgoingMessage: props<{ contact: string; message: Message }>(),
  },
});
