import { Injectable, inject, signal } from '@angular/core';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { GetVisitsUseCase } from '../domain/visitUsecases/getVisitsUseCase';
import { AddVisitUseCase } from '../domain/visitUsecases/addVisitUseCase';

@Injectable({ providedIn: 'root' })
export class VisitsTabController {
  private getVisitsUseCase = inject(GetVisitsUseCase);
  private addVisitUseCase = inject(AddVisitUseCase);

  visits = signal<PatientVisitEntity[]>([]);
  showAddVisitForm = signal<boolean>(false);
  selectedVisit = signal<PatientVisitEntity | null>(null);
  counter : number = 0 ;

  loadVisits(patientId: number | undefined): void {
    if (patientId) {
      this.getVisitsUseCase.execute(patientId).subscribe({
        next: (data: PatientVisitEntity[]) => {
          this.visits.set(data);
        },
        error: (error: Error) => {
          console.error('Error fetching visits:', error);
        },
      });
    }
  }

  toggleAddVisitForm(show: boolean): void {
    this.showAddVisitForm.set(show);
    if (show) {
      this.selectedVisit.set(null); // Clear selected visit when showing add form
    }
  }

  selectVisit(visit: PatientVisitEntity): void {
    this.selectedVisit.set(visit);
    this.showAddVisitForm.set(false); // Hide add form when selecting a visit
  }

  clearSelectedVisit(): void {
    this.selectedVisit.set(null);
  }

  onVisitAdded(patientId: number | undefined): void {
    this.toggleAddVisitForm(false);
    this.loadVisits(patientId); // Refresh the list of visits
  }

  // This method is not directly used by the controller but is here for completeness
  // if you decide to add a visit directly from the controller in the future.
  addVisit(visit: PatientVisitEntity): void {
    this.addVisitUseCase.execute(visit).subscribe({
      next: (newVisit) => {
        console.log('Visit added via controller:', newVisit);
        // Optionally update the visits signal here if needed, or rely on loadVisits
      },
      error: (error) => {
        console.error('Error adding visit via controller:', error);
      },
    });
  }
}
