import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Message } from '../../chat/models/socket.interface';

export const messagesActions = createActionGroup({
  source: 'chat',
  events: {
    addMessages: props<{ messages: Message[] }>(),
    deleteAllMessages: emptyProps(),
    deleteMessage: props<{ id: string }>(),
    editMessage: props<{ id: string; text: string; isEdited: boolean }>(),
    addMessage: props<{ message: Message }>(),
  },
});
