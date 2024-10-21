import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/user.selector';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);

  const router = inject(Router);

  let isUserLogin = false;

  store.select(selectUser).subscribe((user) => {
    isUserLogin = user.isUserLogin;
  });

  if (isUserLogin) {
    return true;
  }
  return router.parseUrl('/login');
};
