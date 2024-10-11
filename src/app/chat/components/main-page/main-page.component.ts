import { Component, inject } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { MessagesComponent } from '../messages/messages.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectChat } from '../../../store/selectors/chat.selector';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [UsersListComponent, MessagesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public isChatOpen: boolean = false;

  private subscription = new Subscription();

  private store = inject(Store);

  constructor() {
    this.subscription.add(
      this.store.select(selectChat).subscribe((chat) => {
        this.isChatOpen = chat.isOpen;
      })
    );
  }
}
