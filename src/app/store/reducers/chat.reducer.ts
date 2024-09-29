import { createReducer, on } from '@ngrx/store';
import { ChatState } from '../interfaces/store.interface';
import { chatActions } from '../actions/chat.action';

export const initialState: ChatState = {
  isOpen: false,
  contactName: '',
};

export const chatReducer = createReducer(
  initialState,
  on(chatActions.open, (state, { contactName }) => ({
    ...state,
    contactName,
    isOpen: true,
  })),
  on(chatActions.close, (state) => ({
    ...state,
    isOpen: false,
    contactName: '',
  }))
);
