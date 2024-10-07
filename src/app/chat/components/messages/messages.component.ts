import { Component, inject, input } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { chatActions } from '../../../store/actions/chat.action';
import { Subscription } from 'rxjs/internal/Subscription';
import { selectChat } from '../../../store/selectors/chat.selector';
import { ChatService } from '../../services/chat.service';
import { WebsocketService } from '../../../websocket/websocket.service';
import {
  Message,
  messageResponse,
  messagesListResponse,
} from '../../models/socket.interface';
import { MessageComponent } from '../message/message.component';
import { selectContactChat } from '../../../store/selectors/messages.selector';
import { switchMap } from 'rxjs';
import { messagesActions } from '../../../store/actions/messages.action';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MessageComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  private fb = inject(NonNullableFormBuilder);

  private store = inject(Store);

  private chatService = inject(ChatService);

  private wsService = inject(WebsocketService);

  private subscription = new Subscription();

  public messages: Message[] | undefined = [];

  public form = this.fb.group({
    text: ['', Validators.required],
  });

  public chat = {
    isOpen: false,
    contactName: '',
    isOnline: false,
  };
  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(selectChat)
        .pipe(
          switchMap((chat) => {
            this.chat = chat;
            return this.store.select(selectContactChat(this.chat.contactName));
          })
        )
        .subscribe((contact) => {
          const messages = [...contact?.messages!];
          this.messages = messages?.reverse();
        })
    );
    this.wsService.onMessage<messageResponse>().subscribe((message) => {
      if (
        message.type === 'MSG_SEND' &&
        (message.payload.message.from === this.chat.contactName ||
          message.payload.message.to === this.chat.contactName)
      ) {
        this.store.dispatch(
          messagesActions.addIncomingMessage({
            contact: this.chat.contactName,
            message: message.payload.message,
          })
        );
      }
    });
  }

  public closeChat() {
    this.store.dispatch(chatActions.close());
  }

  public onSubmit() {
    this.chatService.sendMessage(
      this.chat.contactName,
      this.form.getRawValue().text
    );
    this.form.reset();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
