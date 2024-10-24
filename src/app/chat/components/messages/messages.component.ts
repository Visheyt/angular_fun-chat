import { Component, computed, effect, inject, input } from '@angular/core';
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
import { selectUserMessages } from '../../../store/selectors/messages.selector';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
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

  private isEdit = computed(() => this.chatService.isEdit());

  public messages: Message[] = [];

  public form = this.fb.group({
    text: ['', Validators.required],
  });

  public isEditEffect = effect(() => {
    if (this.isEdit().isEdit) {
      this.form.get('text')?.patchValue(this.isEdit().text);
    }
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
            return this.store.select(selectUserMessages(this.chat.contactName));
          })
        )
        .subscribe((messages) => {
          this.messages = [...messages.reverse()];
        })
    );

    this.subscription.add(
      this.wsService.onMessage<messageResponse>().subscribe((message) => {
        if (message.type === 'MSG_SEND') {
          this.store.dispatch(
            messagesActions.addMessage({
              message: message.payload.message,
            })
          );
        }
      })
    );
  }

  public closeChat() {
    this.store.dispatch(chatActions.close());
  }

  public onSubmit() {
    if (!this.isEdit().isEdit) {
      this.chatService.sendMessage(
        this.chat.contactName,
        this.form.getRawValue().text
      );
    } else {
      this.chatService.editMessage(this.form.getRawValue().text);
      this.chatService.isEdit.set({ id: '', isEdit: false, text: '' });
    }

    this.form.reset();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
