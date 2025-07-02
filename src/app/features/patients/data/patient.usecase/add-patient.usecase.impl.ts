import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/patient.repository';
import { PatientEntity } from '../../domain/patient-entity';
import { AddPatientUsecase } from '@app/features/patients/domain/patientUsecases/add-patient.usecase';

@Injectable({ providedIn: 'root' })
export class AddPatientUsecaseImpl extends AddPatientUsecase {
  private repository = inject(PatientRepository);

  execute(patient: PatientEntity): Observable<PatientEntity> {
    return this.repository.addPatient(patient);
  }
}
