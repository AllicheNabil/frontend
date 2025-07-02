import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPatientsUsecase } from '../../domain/patientUsecases/get-patients.usecase';
import { PatientRepository } from '../../domain/patient.repository';
import { PatientEntity } from '../../domain/patient-entity';

@Injectable({ providedIn: 'root' })
export class GetPatientsUsecaseImpl extends GetPatientsUsecase {
  private repository = inject(PatientRepository);

  execute(): Observable<PatientEntity[]> {
    return this.repository.getPatients();
  }
}
