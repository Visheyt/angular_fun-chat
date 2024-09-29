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
import { messagesListResponse } from '../../models/socket.interface';

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

  public form = this.fb.group({
    text: ['', Validators.required],
  });

  public chat = {
    isOpen: false,
    contactName: '',
    isOnline: false,
  };

  constructor() {
    this.subscription.add(
      this.store.select(selectChat).subscribe((chat) => {
        this.chat = chat;
      })
    );
    this.subscription.add(
      this.wsService.onMessage<messagesListResponse>().subscribe((message) => {
        if (message.type === 'MSG_FROM_USER') {
          this.store.dispatch(
            chatActions.addMessages({ messages: message.payload.messages })
          );
        }
      })
    );
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
