import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VisitService implements VisitRepository {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/patient'; // Base URL for patient-related endpoints

  getVisits(patientId: number): Observable<PatientVisitEntity[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patientId}/visits`).pipe(
      map(visits => visits.map(visit => PatientVisitEntity.fromMap(visit)))
    );
  }

  addVisit(visit: PatientVisitEntity): Observable<PatientVisitEntity> {
    return this.http.post<any>(`${this.apiUrl}/${visit.patientId}/visits`, visit.toMap()).pipe(
      map(newVisit => PatientVisitEntity.fromMap(newVisit))
    );
  }
}
