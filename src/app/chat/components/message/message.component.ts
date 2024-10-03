import { Component, inject, input } from '@angular/core';
import { Message } from '../../models/socket.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserName } from '../../../store/selectors/user.selector';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  public message = input.required<Message>();

  private store = inject(Store);

  public subscription = new Subscription();

  public userName = '';

  constructor() {
    this.subscription.add(
      this.store.select(selectUserName).subscribe((userName) => {
        this.userName = userName;
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
