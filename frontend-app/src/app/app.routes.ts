import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'todos', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
