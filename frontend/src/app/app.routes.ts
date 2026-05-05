import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { EventsListComponent } from './features/events/pages/events-list/events-list.component';
import { EventDetailComponent } from './features/events/pages/event-detail/event-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];