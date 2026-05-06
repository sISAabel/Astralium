import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        localStorage.setItem('userId', response.user.id);
        this.authService.setUserPoints(response.user.points);
        this.authService.setUserData(response.user);

        this.isLoading = false;
        this.router.navigate(['/']);
      },

      error: () => {
        this.errorMessage = 'Email o contraseña incorrectos';
        this.isLoading = false;
      },
    });
  }
}
