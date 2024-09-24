import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WebsocketService } from '../../../../websocket/websocket.service';
import { Store } from '@ngrx/store';
import { userActions } from '../../../../store/actions/user.action';
import { userMessageResponse } from '../../../../websocket/model/message.interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private fb = inject(NonNullableFormBuilder);

  private store = inject(Store);

  private socket = inject(WebsocketService);

  public form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    this.socket.onMessage<userMessageResponse>().subscribe((message) => {
      if (message.type === 'USER_LOGIN') {
        this.store.dispatch(userActions.login(message.payload.user));
      }
    });
  }

  public onSubmit() {
    this.socket.auth(
      this.form.getRawValue().login,
      this.form.getRawValue().password
    );
  }
}
