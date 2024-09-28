import { Component } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [UsersListComponent, MessagesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
