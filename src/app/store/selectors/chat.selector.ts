import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/store.interface';

export const chatState = (state: AppState) => state.chatState;

export const selectChat = createSelector(chatState, (state) => state);

export const selectMessages = createSelector(
  chatState,
  (state) => state.messages
);
