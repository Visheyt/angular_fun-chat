import { Component, inject, input } from '@angular/core';
import {
  Message,
  messageDeletion,
  messageEdition,
} from '../../models/socket.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserName } from '../../../store/selectors/user.selector';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ChatService } from '../../services/chat.service';
import { WebsocketService } from '../../../websocket/websocket.service';
import { messagesActions } from '../../../store/actions/messages.action';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  public message = input.required<Message>();

  private store = inject(Store);

  private chatService = inject(ChatService);

  private wsService = inject(WebsocketService);

  public subscription = new Subscription();

  public userName = '';

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectUserName).subscribe((userName) => {
        this.userName = userName;
      })
    );
    this.subscription.add(
      this.wsService.onMessage<messageDeletion>().subscribe((message) => {
        if (
          message.type === 'MSG_DELETE' &&
          message.payload.message.id === this.message().id
        ) {
          this.store.dispatch(
            messagesActions.deleteMessage({ id: this.message().id })
          );
        }
      })
    );
    this.subscription.add(
      this.wsService.onMessage<messageEdition>().subscribe((message) => {
        if (
          message.type === 'MSG_EDIT' &&
          message.payload.message.id === this.message().id
        ) {
          this.store.dispatch(
            messagesActions.editMessage({
              id: this.message().id,
              text: message.payload.message.text,
              isEdited: message.payload.message.status.isEdited,
            })
          );
        }
      })
    );
  }

  public deleteMessage() {
    this.chatService.deleteMessage(this.message().id);
  }

  public editMessage() {
    this.chatService.isEdit.set({
      id: this.message().id,
      isEdit: true,
      text: this.message().text,
    });
  }
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
