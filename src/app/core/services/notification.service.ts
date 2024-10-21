import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotification(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ) {
    const msgWithFirstUpper =
      message.slice(0, 1).toUpperCase() + message.slice(1, message.length);

    this.snackBar.open(msgWithFirstUpper, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
