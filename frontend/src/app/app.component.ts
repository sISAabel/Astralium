import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  isWelcomePage(): boolean {
    return this.router.url === '/welcome';
  }
}