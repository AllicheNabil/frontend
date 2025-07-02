import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PatientRepository } from '../domain/patient.repository';
import { PatientEntity } from '../domain/patient-entity';

@Injectable({ providedIn: 'root' })
export class PatientService extends PatientRepository {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001/patient'; // URL de votre API backend

  getPatients(): Observable<PatientEntity[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((data) => data.map((item) => PatientEntity.fromMap(item)))
    );
  }

  getPatientById(patientId: string): Observable<PatientEntity> {
    return this.http.get<any>(`${this.baseUrl}/id/${patientId}`).pipe(
      map((data) => PatientEntity.fromMap(data))
    );
  }

  addPatient(patient: PatientEntity): Observable<PatientEntity> {
    console.log('Adding patient:', patient.toMap());
    return this.http.post<any>(this.baseUrl, patient.toMap()).pipe(
      map((data) => PatientEntity.fromMap(data))
    );
    
  }

  updatePatient(patient: PatientEntity): Observable<PatientEntity> {
    return this.http.put<any>(`${this.baseUrl}/${patient.id}`, patient.toMap()).pipe(
      map((data) => PatientEntity.fromMap(data))
    );
  }

  deletePatient(patientId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${patientId}`);
  }
}
