import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EventsService } from '../../../../core/services/events.service';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  event?: Event;

  isLoading = false;
  attendanceLoading = false;

  errorMessage = '';
  successMessage = '';

  hasAttended = false;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private attendanceService: AttendanceService,
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));

    if (eventId) {
      this.loadEvent(eventId);
    }
  }

  loadEvent(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

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
    this.errorMessage = '';
    this.successMessage = '';

    this.attendanceService.attendEvent(this.event.id).subscribe({
      next: (response: any) => {
        this.successMessage =
          response.message || 'Asistencia confirmada correctamente';

        this.hasAttended = true;
        this.attendanceLoading = false;
      },
      error: (error) => {
        const message =
          error.error?.message || 'No se pudo confirmar la asistencia';

        if (message.includes('ya asistió')) {
          this.hasAttended = true;
          this.successMessage =
            'Ya asististe a este evento';
          this.errorMessage = '';
        } else {
          this.errorMessage = message;
        }

        this.attendanceLoading = false;
      },
    });
  }
}
