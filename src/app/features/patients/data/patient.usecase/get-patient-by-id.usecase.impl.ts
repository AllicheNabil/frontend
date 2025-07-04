import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRepository } from '../../domain/patient.repository';
import { GetPatientByIdUsecase } from '../../domain/patientUsecases/get-patient-by-id.usecase';
import { Patient } from '../../domain/patient-entity';

@Injectable({ providedIn: 'root' })
export class GetPatientByIdUsecaseImpl extends GetPatientByIdUsecase {
  private repository = inject(PatientRepository);

  execute(patientId: string): Observable<Patient> {
    return this.repository.getPatientById(patientId);
  }
}
