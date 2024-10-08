import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
// import { BoardsComponent } from './pages/boards/boards.component';
import { BoardsComponent } from './modules/boards/pages/boards/boards.component';
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
    canActivate: [ authGuard ], // aqui solo le haria la verificacion cuando cambiamos de /login a /app, si cambiamos de /app/boards a /app/users no se haria la verificacion
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      },
      {
        path: 'boards',
        canActivate: [ authGuard ], // se usar el guardian en todas las rutas hijas para que se aplique a todas las rutas hijas, por lo que si cambiamos de /app/boards a /app/users se hara la verificacion
        loadComponent: () => import('./modules/boards/pages/boards/boards.component').then(m => m.BoardsComponent)
      },
      {
        path: 'board/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./modules/boards/pages/board/board.component').then(m => m.BoardComponent)
      },
      {
        path: 'users',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/users/pages/users-table/users-table.component').then(m => m.UsersTableComponent)
      }
    ]
  },
  // {
  //   path: 'boards',
  //   component: BoardsComponent
  // },
  {
    path: 'board',
    component: BoardsComponent
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
