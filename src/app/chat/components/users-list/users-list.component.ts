import { Component, inject } from '@angular/core';
import { WebsocketService } from '../../../websocket/websocket.service';
import { Store } from '@ngrx/store';
import { User, usersListResponse } from '../../models/socket.interface';
import { usersListActions } from '../../../store/actions/users-list.action';
import {
  selectActiveUsers,
  selectInactiveUsers,
} from '../../../store/selectors/users-list.selector';
import { Subscription } from 'rxjs';
import { UserComponent } from '../user/user.component';
import { userActions } from '../../../store/actions/user.action';
import { selectUserName } from '../../../store/selectors/user.selector';
import { chatActions } from '../../../store/actions/chat.action';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private socketService = inject(WebsocketService);

  private store = inject(Store);

  protected activeUsers: User[] = [];

  protected inactiveUsers: User[] = [];

  private subscriptions = new Subscription();

  protected currentUserName: string = '';

  constructor() {
    this.getUsers();

    this.subscriptions.add(
      this.socketService.onMessage<usersListResponse>().subscribe((message) => {
        if (message.type === 'USER_ACTIVE') {
          this.store.dispatch(
            usersListActions.activeUsers({ users: message.payload.users })
          );
        }

        if (message.type === 'USER_INACTIVE') {
          this.store.dispatch(
            usersListActions.inactiveUsers({ users: message.payload.users })
          );
        }
      })
    );

    this.subscriptions.add(
      this.store.select(selectActiveUsers).subscribe((activeUsers) => {
        this.activeUsers = activeUsers;
      })
    );

    this.subscriptions.add(
      this.store.select(selectInactiveUsers).subscribe((inactiveUsers) => {
        this.inactiveUsers = inactiveUsers;
      })
    );

    this.subscriptions.add(
      this.store.select(selectUserName).subscribe((userName) => {
        this.currentUserName = userName;
      })
    );
  }

  private getUsers() {
    this.socketService.getActiveUsers();
    this.socketService.getInActiveUsers();
  }

  public openChat(contactName: string, isOnline: boolean) {
    this.store.dispatch(chatActions.open({ contactName, isOnline }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
