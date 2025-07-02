import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MedicationEntity } from '../domain/MedicationEntity';
import { MedicationRepository } from '../domain/MedicationRepository';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends MedicationRepository {
  private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

  getMedications(patientId: number): Observable<MedicationEntity[]> {
    return this.http.get<MedicationEntity[]>(`${this.baseUrl}/${patientId}/medications`).pipe(
      map((data) => data.map((data) => MedicationEntity.fromMap(data)))
    ) ;
  }

  addMedication(medication: MedicationEntity): Observable<MedicationEntity> {
    console.log('Adding medication:', medication.toMap());
    return this.http.post<any>(`${this.baseUrl}/${medication.patientId}/medications`, medication.toMap()).pipe(
      map((data) => MedicationEntity.fromMap(data))
    );
  }
}
