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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private fb = inject(NonNullableFormBuilder);

  private router = inject(Router);

  private store = inject(Store);

  private socket = inject(WebsocketService);

  private subscriptions = new Subscription();

  public form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    const subscription = this.socket
      .onMessage<userMessageResponse>()
      .subscribe((message) => {
        if (message.type === 'USER_LOGIN') {
          this.store.dispatch(
            userActions.login({
              login: message.payload.user.login,
              password: this.form.getRawValue().password,
            })
          );
          this.router.navigate(['main']);
        }
      });
    this.subscriptions.add(subscription);
  }

  public onSubmit() {
    this.socket.login(
      this.form.getRawValue().login,
      this.form.getRawValue().password
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
