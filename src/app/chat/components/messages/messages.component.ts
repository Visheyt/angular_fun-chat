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

  public form = this.fb.group({
    message: ['', Validators.required],
  });

  public chat = {
    isOpen: false,
    contactName: '',
    isOnline: false,
  };

  private subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.store.select(selectChat).subscribe((chat) => {
        this.chat = chat;
      })
    );
  }

  public closeChat() {
    this.store.dispatch(chatActions.close());
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
