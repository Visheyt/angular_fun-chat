import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserName,
  selectUserStatus,
} from '../../../store/selectors/user.selector';
import { RouterLink } from '@angular/router';
import { WebsocketService } from '../../../websocket/websocket.service';
import { userActions } from '../../../store/actions/user.action';
import { Subscription } from 'rxjs';

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

  protected user = {
    login: '',
    isUserLogin: false,
    password: '',
  };

  private subscriptions = new Subscription();

  constructor() {
    const subscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });

    this.subscriptions.add(subscription);
  }
  public logout() {
    this.socketService.logout(this.user.login, this.user.password);
    this.store.dispatch(userActions.logout());
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
