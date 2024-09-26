import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/auth/login/login-page/login-page.component';
import { MainPageComponent } from './chat/components/main-page/main-page.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
