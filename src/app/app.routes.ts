import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TableComponent } from './pages/table/table.component';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { RecoveryComponent } from './modules/auth/pages/recovery/recovery.component';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [ redirectGuard ],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password'
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
        title: 'Recovery'
      },
    ],
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [ authGuard ],
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      },
      {
        path: 'boards',
        loadComponent: () => import('./pages/boards/boards.component').then(m => m.BoardsComponent)
      }
    ]
  },
  // {
  //   path: 'boards',
  //   component: BoardsComponent
  // },
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'scroll',
    component: ScrollComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
];
