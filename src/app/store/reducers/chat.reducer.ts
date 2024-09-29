import { createReducer, on } from '@ngrx/store';
import { ChatState } from '../interfaces/store.interface';
import { chatActions } from '../actions/chat.action';

export const initialState: ChatState = {
  isOpen: false,
  contactName: '',
  isOnline: false,
  messages: [],
};

export const chatReducer = createReducer(
  initialState,
  on(chatActions.open, (state, { contactName, isOnline }) => ({
    ...state,
    contactName,
    isOpen: true,
    isOnline,
  })),
  on(chatActions.close, (state) => ({
    ...state,
    isOpen: false,
    contactName: '',
    isOnline: false,
  })),
  on(chatActions.addMessages, (state, { messages }) => ({
    ...state,
    messages,
  }))
);
