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

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private socketService = inject(WebsocketService);

  private store = inject(Store);

  protected activeUsers: User[] = [];

  protected inactiveUsers: User[] = [];

  private subscriptions = new Subscription();

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
        console.log(this.activeUsers);
      })
    );

    this.subscriptions.add(
      this.store.select(selectInactiveUsers).subscribe((inactiveUsers) => {
        this.inactiveUsers = inactiveUsers;
      })
    );
  }

  private getUsers() {
    this.socketService.getActiveUsers();
    this.socketService.getInActiveUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
