import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { EventsListComponent } from './features/events/pages/events-list/events-list.component';
import { EventDetailComponent } from './features/events/pages/event-detail/event-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: EventsListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'events/:id',
    component: EventDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
