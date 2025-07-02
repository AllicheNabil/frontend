import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/patient.repository';
import { UpdatePatientUsecase } from '../../domain/patientUsecases/update-patient.usecase';
import { PatientEntity } from '../../domain/patient-entity';

@Injectable({ providedIn: 'root' })
export class UpdatePatientUsecaseImpl extends UpdatePatientUsecase {
  private repository = inject(PatientRepository);

  execute(patient: PatientEntity): Observable<PatientEntity> {
    return this.repository.updatePatient(patient);
  }
}
