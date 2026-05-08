import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { EventsListComponent } from './features/events/pages/events-list/events-list.component';
import { EventDetailComponent } from './features/events/pages/event-detail/event-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { WelcomeComponent } from './features/auth/pages/welcome/welcome.component';
import { AdminDashboardComponent } from './features/admin/pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: EventsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
