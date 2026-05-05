import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/user-events`;

  constructor(private http: HttpClient) {}

  attendEvent(eventId: number) {
    return this.http.post<ApiResponse>(`${this.apiUrl}/attend`, {
      eventId,
    });
  }
}
