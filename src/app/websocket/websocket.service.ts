import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WsMessage } from './model/message.interface';
import { NotificationService } from '../core/services/notification.service';

function createMessage<T>(type: WsMessage, payload: T) {
  return { id: '', type, payload };
}
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocketSubject<any>;

  private notificationService = inject(NotificationService);

  constructor() {
    this.socket = new WebSocketSubject('http://localhost:4000');

    this.socket.subscribe({
      next: (msg) => {
        if (msg.type === 'ERROR') {
          this.notificationService.showNotification(msg.payload.error);
        }
      },
      error: (err) =>
        this.notificationService.showNotification(err.payload.error),
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  public login(login: string, password: string) {
    const message = createMessage('USER_LOGIN', {
      user: { login, password },
    });

    this.socket.next(message);
  }
  public logout(login: string, password: string) {
    const message = createMessage('USER_LOGOUT', {
      user: { login, password },
    });
    this.socket.next(message);
  }

  public getActiveUsers() {
    const message = createMessage('USER_ACTIVE', {});
    this.socket.next(message);
  }

  public getInActiveUsers() {
    const message = createMessage('USER_INACTIVE', {});
    this.socket.next(message);
  }

  public sendMessage(to: string, text: string) {
    const message = createMessage('MSG_SEND', {
      message: {
        to,
        text,
      },
    });
    this.socket.next(message);
  }

  public getMessages(login: string) {
    const message = createMessage('MSG_FROM_USER', {
      user: {
        login,
      },
    });
    this.socket.next(message);
  }

  public deleteMessage(id: string) {
    const message = createMessage('MSG_DELETE', {
      message: {
        id,
      },
    });

    this.socket.next(message);
  }

  public editMessage(text: string, id: string) {
    const message = createMessage('MSG_EDIT', {
      message: {
        id,
        text,
      },
    });

    this.socket.next(message);
  }

  public markAsReaded(id: string) {
    const message = createMessage('MSG_READ', {
      message: {
        id,
      },
    });
    this.socket.next(message);
  }

  public onMessage<T>(): Observable<T> {
    return this.socket.asObservable();
  }

  public closeConnection() {
    this.socket.complete();
  }
}
