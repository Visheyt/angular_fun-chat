import { createReducer, on } from '@ngrx/store';
import { ChatState, MessagesState } from '../interfaces/store.interface';
import { chatActions } from '../actions/chat.action';
import { messagesActions } from '../actions/messages.action';

export const initialState: MessagesState = {
  contacts: [],
};

export const messagesReducer = createReducer(
  initialState,
  on(messagesActions.addMessages, (state, { contact, messages }) => ({
    ...state,
    contacts: state.contacts.find((c) => c.contact === contact)
      ? state.contacts.map((c) =>
          c.contact === contact ? { ...c, messages } : c
        )
      : [...state.contacts, { contact, messages }],
  })),
  on(messagesActions.deleteAllMessages, (state) => ({
    ...state,
    contacts: [],
  })),
  on(messagesActions.deleteMessage, (state, { id }) => ({
    ...state,
    contacts: state.contacts.map((c) => ({
      contact: c.contact,
      messages: c.messages.filter((message) => message.id !== id),
    })),
  })),
  on(messagesActions.editMessage, (state, { id, isEdited, text }) => ({
    ...state,
    contacts: state.contacts.map((c) => ({
      ...c,
      messages: c.messages.map((message) =>
        message.id === id
          ? { ...message, text, status: { ...message.status, isEdited } }
          : message
      ),
    })),
  })),
  on(messagesActions.addIncomingMessage, (state, { contact, message }) => ({
    ...state,
    contacts: state.contacts.map((c) =>
      c.contact === contact ? { ...c, messages: [...c.messages, message] } : c
    ),
  })),
  on(messagesActions.addOutgoingMessage, (state, { contact, message }) => ({
    ...state,
    contacts: state.contacts.map((c) =>
      c.contact === contact ? { ...c, messages: [...c.messages, message] } : c
    ),
  }))
);
