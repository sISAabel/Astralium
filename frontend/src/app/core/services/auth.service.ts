import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private userPointsSubject = new BehaviorSubject<number>(
    Number(localStorage.getItem('userPoints')) || 0,
  );

  userPoints$ = this.userPointsSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, {
      email,
      password,
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/users`, {
    username,
    email,
    password,
  });
}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUserData(user: any): void {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userPoints', user.points);
    localStorage.setItem('username', user.username);

    this.userPointsSubject.next(user.points);
  }

  setUserPoints(points: number): void {
    localStorage.setItem('userPoints', String(points));
    this.userPointsSubject.next(points);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
