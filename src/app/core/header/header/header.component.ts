import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/user.selector';
import { Router, RouterLink } from '@angular/router';
import { WebsocketService } from '../../../websocket/websocket.service';
import { userActions } from '../../../store/actions/user.action';
import { Subscription } from 'rxjs';
import { userMessageResponse } from '../../../websocket/model/message.interface';
import { usersListActions } from '../../../store/actions/users-list.action';
import { chatActions } from '../../../store/actions/chat.action';
import { messagesActions } from '../../../store/actions/messages.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);

  private socketService = inject(WebsocketService);

  private router = inject(Router);

  protected user = {
    login: '',
    isUserLogin: false,
    password: '',
  };

  private subscriptions = new Subscription();

  constructor() {
    this.subscriptions.add(
      this.store.select(selectUser).subscribe((user) => {
        this.user = user;
      })
    );

    this.subscriptions.add(
      this.socketService
        .onMessage<userMessageResponse>()
        .subscribe((message) => {
          if (message.type === 'USER_LOGOUT') {
            this.store.dispatch(userActions.logout());
            this.store.dispatch(
              usersListActions.disconnectUser({
                login: message.payload.user.login,
              })
            );
          }
        })
    );
  }
  public logout() {
    this.socketService.logout(this.user.login, this.user.password);
    this.store.dispatch(chatActions.close());
    this.store.dispatch(messagesActions.deleteAllMessages());
    this.router.navigate(['login']);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
