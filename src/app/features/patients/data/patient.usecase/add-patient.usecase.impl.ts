import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/patient.repository';
import { Patient } from '../../domain/patient-entity';
import { AddPatientUsecase } from '@app/features/patients/domain/patientUsecases/add-patient.usecase';

@Injectable({ providedIn: 'root' })
export class AddPatientUsecaseImpl extends AddPatientUsecase {
  private repository = inject(PatientRepository);

  execute(patient: Patient): Observable<Patient> {
    return this.repository.addPatient(patient);
  }
}
