import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';
import { GetVisitsUseCase } from '@app/features/visits/domain/visitUsecases/getVisitsUseCase';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';

@Injectable({ providedIn: 'root' })
export class GetVisitsUseCaseImpl extends GetVisitsUseCase {
  private repository = inject(VisitRepository);

  execute(patientId: number): Observable<PatientVisitEntity[]> {
    return this.repository.getVisits(patientId);
  }
}
