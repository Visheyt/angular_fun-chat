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

  public auth(login: string, password: string) {
    const message = createMessage('USER_LOGIN', {
      user: { login, password },
    });
    console.log(message);
    this.socket.next(message);
  }

  public onMessage<T>(): Observable<T> {
    return this.socket.asObservable();
  }

  public closeConnection() {
    this.socket.complete();
  }
}
