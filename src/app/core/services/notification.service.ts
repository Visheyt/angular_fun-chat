import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { act } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotification(
    message: string,
    action: string = '',
    duration: number = 3000
  ) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
