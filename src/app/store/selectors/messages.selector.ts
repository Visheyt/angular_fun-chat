import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/store.interface';
import { Message } from '../../chat/models/socket.interface';

export const messagesState = (state: AppState) => state.messagesState;

export const selectUserMessages = (user: string) =>
  createSelector(messagesState, (state) => {
    return state.messages.filter(
      (message) => message.from === user || message.to === user
    );
  });
