import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  selectUserName,
  selectUserStatus,
} from '../../../store/selectors/user.selector';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);

  public isUserLogin: boolean = false;

  public userName: string = '';

  constructor() {
    this.store.select(selectUserStatus).subscribe((status) => {
      this.isUserLogin = status;
    });
    this.store.select(selectUserName).subscribe((userName) => {
      this.userName = userName;
    });
  }

  ngOnDestroy(): void {}
}
