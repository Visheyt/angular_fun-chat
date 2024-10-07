import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/store.interface';

export const messagesState = (state: AppState) => state.messagesState;

export const selectContactChat = (user: string) =>
  createSelector(messagesState, (state) =>
    state.contacts.find((contact) => contact.contact === user)
  );
