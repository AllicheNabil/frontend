import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Medication } from '../domain/MedicationEntity';
import { MedicationRepository } from '../domain/MedicationRepository';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends MedicationRepository {
  private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

  getMedications(patientId: number): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.baseUrl}/patient/${patientId}/medications`).pipe(
      map((data) => data.map((data) => Medication.fromMap(data)))
    ) ;
  }

  addMedication(medication: Medication): Observable<Medication> {
    console.log('Service : Adding medication:', medication.toMap());
    return this.http.post<any>(`${this.baseUrl}/patient/${medication.patientId}/medications`, medication.toMap()).pipe(
      map((data) => Medication.fromMap(data))
    );
  }
}
