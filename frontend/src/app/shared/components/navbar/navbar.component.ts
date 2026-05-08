import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userPoints = 0;
  username = '';
  isAdmin = false;

  constructor(
  public authService: AuthService,
  private router: Router,
) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    this.isAdmin = this.authService.isAdmin();

    if (!this.isAdmin) {
      this.authService.userPoints$.subscribe((points) => {
        this.userPoints = points;
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}