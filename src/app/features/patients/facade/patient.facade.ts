import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Patient } from '../domain/patient-entity';
import { PatientActions } from '../data/state/patient.actions';
import { selectAllPatients, selectLoading, selectError, selectSelectedPatient } from '../data/state/patient.selectors';

@Injectable({
  providedIn: 'root'
})
export class PatientFacade {
  private store = inject(Store);

  patients$ = this.store.select(selectAllPatients);
  patient$ = this.store.select(selectSelectedPatient);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  loadPatients(): void {
    this.store.dispatch(PatientActions.loadPatients());
  }

  addPatient(patient: Patient): void {
    this.store.dispatch(PatientActions.addPatient({ patient }));
  }

  updatePatient(patient: Patient): void {
    this.store.dispatch(PatientActions.updatePatient({ patient }));
  }

  deletePatient(id: number): void {
    this.store.dispatch(PatientActions.deletePatient({ id }));
  }

  loadPatient(patientId: number): void {
    this.store.dispatch(PatientActions.loadPatient({ patientId }));
  }
}
