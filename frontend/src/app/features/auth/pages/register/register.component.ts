import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: () => {
          this.successMessage = 'Usuario creado correctamente';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message || 'No se pudo crear el usuario';
          this.isLoading = false;
        },
      });
  }
}