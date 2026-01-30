import { Routes } from '@angular/router';
import { Login } from './page/login/login/login';
import { Registre } from './page/login/registre/registre';
import { Dashboard } from './page/admin/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login' , component: Login},
    { path: 'register' , component: Registre},
    { path: 'admin' , component: Dashboard },
];
