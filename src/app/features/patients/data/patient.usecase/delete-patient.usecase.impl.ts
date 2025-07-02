import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/patient.repository';
import { DeletePatientUsecase } from '../../domain/patientUsecases/delete-patient.usecase';

@Injectable({ providedIn: 'root' })
export class DeletePatientUsecaseImpl extends DeletePatientUsecase {
  private repository = inject(PatientRepository);

  execute(patientId: string): Observable<void> {
    return this.repository.deletePatient(patientId);
  }
}
