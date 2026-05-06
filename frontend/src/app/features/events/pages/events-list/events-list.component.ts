import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EventsService } from '../../../../core/services/events.service';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];
  attendedEventIds: number[] = [];

  isLoading = false;
  errorMessage = '';

  username = '';

  searchTerm = '';
  selectedType = '';
  selectedDate = '';

  constructor(
    private eventsService: EventsService,
    private attendanceService: AttendanceService,
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.loadEvents();
    this.loadAttendedEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.eventsService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los eventos';
        this.isLoading = false;
      },
    });
  }

  loadAttendedEvents(): void {
    this.attendanceService.getUserEvents().subscribe({
      next: (ids) => {
        this.attendedEventIds = ids;
      },
      error: () => {
        console.error('Error cargando eventos asistidos');
      },
    });
  }

  hasAttended(eventId: number): boolean {
    return this.attendedEventIds.includes(eventId);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedDate = '';
  }

  get eventTypes(): string[] {
    return [...new Set(this.events.map((event) => event.type))];
  }

  get filteredEvents(): Event[] {
    return this.events.filter((event) => {
      const matchesName = event.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesType = this.selectedType
        ? event.type === this.selectedType
        : true;

      const eventDate = new Date(event.date).toISOString().split('T')[0];

      const matchesDate = this.selectedDate
        ? eventDate === this.selectedDate
        : true;

      return matchesName && matchesType && matchesDate;
    });
  }
}