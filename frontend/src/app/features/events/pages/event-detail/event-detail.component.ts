import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EventsService } from '../../../../core/services/events.service';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { AuthService } from '../../../../core/services/auth.service';

import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;

  isLoading = false;
  attendanceLoading = false;

  successMessage = '';
  errorMessage = '';

  hasAttended = false;

  showAttendanceModal = false;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private attendanceService: AttendanceService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadEvent(id);
    }
  }

  loadEvent(id: number): void {
    this.isLoading = true;

    this.eventsService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el evento';
        this.isLoading = false;
      },
    });
  }

  confirmAttendance(): void {
    if (!this.event) return;

    this.attendanceLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.attendanceService.attendEvent(this.event.id).subscribe({
      next: (response: any) => {
        this.successMessage =
          response.message || 'Asistencia confirmada correctamente';

        this.hasAttended = true;

        const currentPoints =
          Number(localStorage.getItem('userPoints')) || 0;

        const eventPoints = this.event?.points || 0;

        this.authService.setUserPoints(currentPoints + eventPoints);

        this.showAttendanceModal = true;

        this.attendanceLoading = false;
      },

      error: (error) => {
        if (
          error.error?.message ===
          'El usuario ya asistió a este evento'
        ) {
          this.hasAttended = true;
          this.successMessage =
            'Ya tienes asistencia confirmada para este evento';
        } else {
          this.errorMessage =
            error.error?.message ||
            'No se pudo confirmar la asistencia';
        }

        this.attendanceLoading = false;
      },
    });
  }

  closeAttendanceModal(): void {
    this.showAttendanceModal = false;
  }
}