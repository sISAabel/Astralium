import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EventsService } from '../../../../core/services/events.service';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  events: Event[] = [];

  isLoading = false;
  isEditing = false;
  selectedEventId: number | null = null;

  successMessage = '';
  errorMessage = '';

  eventForm: Partial<Event> = {
    name: '',
    type: '',
    date: '',
    description: '',
    visibility: '',
    status: 'new',
    points: 0,
    image: '',
  };

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;

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

  saveEvent(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.isEditing && this.selectedEventId) {
      this.eventsService.updateEvent(this.selectedEventId, this.eventForm).subscribe({
        next: () => {
          this.successMessage = 'Evento actualizado correctamente';
          this.resetForm();
          this.loadEvents();
        },
        error: () => {
          this.errorMessage = 'No se pudo actualizar el evento';
        },
      });

      return;
    }

    this.eventsService.createEvent(this.eventForm).subscribe({
      next: () => {
        this.successMessage = 'Evento creado correctamente';
        this.resetForm();
        this.loadEvents();
      },
      error: () => {
        this.errorMessage = 'No se pudo crear el evento';
      },
    });
  }

  editEvent(event: Event): void {
    this.isEditing = true;
    this.selectedEventId = event.id;

    this.eventForm = {
      name: event.name,
      type: event.type,
      date: this.formatDateForInput(event.date),
      description: event.description || '',
      visibility: event.visibility || '',
      status: event.status || 'new',
      points: event.points,
      image: event.image || '',
    };
  }

  deleteEvent(id: number): void {
    const confirmDelete = confirm('¿Seguro que quieres borrar este evento?');

    if (!confirmDelete) return;

    this.eventsService.deleteEvent(id).subscribe({
      next: () => {
        this.successMessage = 'Evento eliminado correctamente';
        this.loadEvents();
      },
      error: () => {
        this.errorMessage = 'No se pudo eliminar el evento';
      },
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedEventId = null;

    this.eventForm = {
      name: '',
      type: '',
      date: '',
      description: '',
      visibility: '',
      status: 'new',
      points: 0,
      image: '',
    };
  }

  private formatDateForInput(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}