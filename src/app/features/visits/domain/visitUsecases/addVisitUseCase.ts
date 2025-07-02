import { Observable } from 'rxjs';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class AddVisitUseCase {
  abstract execute(visit: PatientVisitEntity): Observable<PatientVisitEntity>;
}
