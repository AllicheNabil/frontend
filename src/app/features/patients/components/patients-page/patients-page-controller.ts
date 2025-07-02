import { Injectable, signal, computed, inject } from '@angular/core';
import { PatientEntity } from '../../domain/patient-entity';
import { GetPatientsUsecase } from '../../domain/patientUsecases/get-patients.usecase';
import { DeletePatientUsecase } from '../../domain/patientUsecases/delete-patient.usecase';
import { UpdatePatientUsecase } from '../../domain/patientUsecases/update-patient.usecase';
import { AddPatientUsecase } from '@app/features/patients/domain/patientUsecases/add-patient.usecase';

@Injectable({ providedIn: 'root' })
export class PatientsPageController {
  private getPatientsUsecase = inject(GetPatientsUsecase);
  private addPatientUsecase = inject(AddPatientUsecase);
  private deletePatientUsecase = inject(DeletePatientUsecase);
  private updatePatientUsecase = inject(UpdatePatientUsecase);

  // Liste brute (signal) des patients (instances PatientEntity)
  private allPatients = signal<PatientEntity[]>([]);

  // Recherche textuelle (signal)
  searchQuery = signal('');

  // Liste filtrée (computed) des patients selon la recherche
  filteredPatients = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allPatients();

    return this.allPatients().filter((p) =>
      `${p.name}`.toLowerCase().includes(query)
    );
  });

  constructor() {
    this.loadPatients();
  }

  loadPatients() {
    this.getPatientsUsecase.execute().subscribe({
      next: (patients) => this.allPatients.set(patients),
      error: (err) => console.error('Error loading patients:', err),
    });
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  addPatient(patient: PatientEntity) {
    this.addPatientUsecase.execute(patient).subscribe({
      next: (newPatient) => {
        this.allPatients.set([...this.allPatients(), newPatient]);
      },
      error: (err) => console.error('Error adding patient:', err),
    });
  }

  deletePatient(patientId: string) {
    this.deletePatientUsecase.execute(patientId).subscribe({
      next: () => {
        this.allPatients.set(this.allPatients().filter(p => p.id.toString() !== patientId));
      },
      error: (err) => console.error('Error deleting patient:', err),
    });
  }

  updatePatient(patient: PatientEntity) {
    this.updatePatientUsecase.execute(patient).subscribe({
      next: (updatedPatient) => {
        this.allPatients.set(this.allPatients().map(p => p.id === updatedPatient.id ? updatedPatient : p));
      },
      error: (err) => console.error('Error updating patient:', err),
    });
  }
}
