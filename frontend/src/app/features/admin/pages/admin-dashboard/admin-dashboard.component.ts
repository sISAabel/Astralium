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

  activeTab: 'create' | 'manage' = 'create';

  isLoading = false;
  isSaving = false;

  showEditModal = false;
  showDeleteModal = false;

  selectedEventId: number | null = null;
  eventIdToDelete: number | null = null;

  successMessage = '';
  errorMessage = '';

  createForm: Partial<Event> = this.getEmptyForm();
  editForm: Partial<Event> = this.getEmptyForm();

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

  createEvent(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isSaving = true;

    this.eventsService.createEvent(this.createForm).subscribe({
      next: () => {
        this.successMessage = 'Evento creado correctamente';
        this.createForm = this.getEmptyForm();
        this.isSaving = false;
        this.loadEvents();
      },
      error: () => {
        this.errorMessage = 'No se pudo crear el evento';
        this.isSaving = false;
      },
    });
  }

  openEditModal(event: Event): void {
    this.selectedEventId = event.id;
    this.showEditModal = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.editForm = {
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

  updateEvent(): void {
    if (!this.selectedEventId) return;

    this.successMessage = '';
    this.errorMessage = '';
    this.isSaving = true;

    this.eventsService.updateEvent(this.selectedEventId, this.editForm).subscribe({
      next: () => {
        this.successMessage = 'Evento actualizado correctamente';
        this.closeEditModal();
        this.isSaving = false;
        this.loadEvents();
      },
      error: () => {
        this.errorMessage = 'No se pudo actualizar el evento';
        this.isSaving = false;
      },
    });
  }

  openDeleteModal(id: number): void {
    this.eventIdToDelete = id;
    this.showDeleteModal = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeDeleteModal(): void {
    this.eventIdToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDeleteEvent(): void {
    if (!this.eventIdToDelete) return;

    this.successMessage = '';
    this.errorMessage = '';

    this.eventsService.deleteEvent(this.eventIdToDelete).subscribe({
      next: () => {
        this.successMessage = 'Evento eliminado correctamente';
        this.closeDeleteModal();
        this.loadEvents();
      },
      error: () => {
        this.errorMessage = 'No se pudo eliminar el evento';
        this.closeDeleteModal();
      },
    });
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedEventId = null;
    this.editForm = this.getEmptyForm();
  }

  setActiveTab(tab: 'create' | 'manage'): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  private getEmptyForm(): Partial<Event> {
    return {
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