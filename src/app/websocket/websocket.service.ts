import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WsMessage } from './model/message.interface';

function createMessage<T>(type: WsMessage, payload: T) {
  return { id: '', type, payload };
}
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocketSubject<any>;

  constructor() {
    this.socket = new WebSocketSubject('http://localhost:4000');

    this.socket.subscribe({
      next: (message) => console.log('Received:', message),
      error: (err) => console.error('WebSocket error:', err),
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

  public onMessage<T>(): Observable<T> {
    return this.socket.asObservable();
  }

  public closeConnection() {
    this.socket.complete();
  }
}
