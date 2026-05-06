import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
  ) {}

  userPoints = 0;

  ngOnInit(): void {
    this.authService.userPoints$.subscribe((points) => {
      this.userPoints = points;
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
