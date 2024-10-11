import { createReducer, on } from '@ngrx/store';

import { messagesActions } from '../actions/messages.action';
import { MessagesState } from '../interfaces/store.interface';

export const initialState: MessagesState = {
  messages: [],
};

export const messagesReducer = createReducer(
  initialState,
  on(messagesActions.addMessages, (state, { messages }) => ({
    ...state,
    messages: [
      ...state.messages,
      ...messages.filter(
        (newMessage) =>
          !state.messages.some(
            (existingMessage) => existingMessage.id === newMessage.id
          )
      ),
    ],
  })),
  on(messagesActions.deleteAllMessages, (state) => ({
    ...state,
    messages: [],
  })),
  on(messagesActions.deleteMessage, (state, { id }) => ({
    ...state,
    messages: state.messages.filter((message) => message.id !== id),
  })),
  on(messagesActions.editMessage, (state, { id, isEdited, text }) => ({
    ...state,
    messages: state.messages.map((message) =>
      message.id === id
        ? { ...message, text, status: { ...message.status, isEdited } }
        : message
    ),
  })),

  on(messagesActions.addMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  }))
);
