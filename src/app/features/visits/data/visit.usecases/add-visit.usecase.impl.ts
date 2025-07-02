import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddVisitUseCase } from '../../domain/visitUsecases/addVisitUseCase';
import { PatientVisitEntity } from '../../domain/patient-visit-entity';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class AddVisitUseCaseImpl extends AddVisitUseCase {
  private repository = inject(VisitRepository);

  execute(visit: PatientVisitEntity): Observable<PatientVisitEntity> {
    return this.repository.addVisit(visit);
  }
}
