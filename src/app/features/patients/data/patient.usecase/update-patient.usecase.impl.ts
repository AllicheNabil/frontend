import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/patient.repository';
import { UpdatePatientUsecase } from '../../domain/patientUsecases/update-patient.usecase';
import { Patient } from '../../domain/patient-entity';

@Injectable({ providedIn: 'root' })
export class UpdatePatientUsecaseImpl extends UpdatePatientUsecase {
  private repository = inject(PatientRepository);

  execute(patient: Patient): Observable<Patient> {
    return this.repository.updatePatient(patient);
  }
}
