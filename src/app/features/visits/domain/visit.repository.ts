import { Observable } from 'rxjs';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';

export abstract class VisitRepository {
  abstract getVisits(patientId: number): Observable<PatientVisitEntity[]>;
  abstract addVisit(visit: PatientVisitEntity): Observable<PatientVisitEntity>;
}
