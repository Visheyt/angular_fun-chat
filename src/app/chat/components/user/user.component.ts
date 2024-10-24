import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { ChatService } from '../../services/chat.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { messagesActions } from '../../../store/actions/messages.action';
import { WebsocketService } from '../../../websocket/websocket.service';
import { messagesListResponse } from '../../models/socket.interface';
import { selectUser } from '../../../store/selectors/user.selector';
import { selectUnreadMessages } from '../../../store/selectors/messages.selector';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgClass],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private chatService = inject(ChatService);

  private store = inject(Store);

  private wsService = inject(WebsocketService);

  private subscription = new Subscription();

  public contact = input.required<string>();

  public isLogin = input.required<boolean>();

  public unreadMessages = 0;

  public currentUser = '';

  ngOnInit(): void {
    this.chatService.getMessages(this.contact());

    this.subscription.add(
      this.wsService.onMessage<messagesListResponse>().subscribe((message) => {
        if (message.type === 'MSG_FROM_USER') {
          this.store.dispatch(
            messagesActions.addMessages({
              messages: message.payload.messages,
            })
          );
        }
      })
    );

    this.subscription.add(
      this.store.select(selectUser).subscribe((userName) => {
        this.currentUser = userName.login;
      })
    );

    this.subscription.add(
      this.store
        .select(selectUnreadMessages(this.contact(), this.currentUser))
        .subscribe((messagesCount) => {
          this.unreadMessages = messagesCount;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
