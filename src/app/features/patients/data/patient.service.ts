import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PatientRepository } from '../domain/patient.repository';
import { Patient } from '../domain/patient-entity';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class PatientService extends PatientRepository {
  private http = inject(HttpClient);
  
  private baseUrl =  environment.apiUrl;
  //  // de votre API backend

  getPatients(): Observable<Patient[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((data) => data.map((item) => Patient.fromMap(item)))
    );
  }

  getPatientById(patientId: string): Observable<Patient> {
    return this.http.get<any>(`${this.baseUrl}/id/${patientId}`).pipe(
      map((data) => Patient.fromMap(data))
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    console.log('Adding patient:', patient.toMap());
    return this.http.post<any>(this.baseUrl, patient.toMap()).pipe(
      map((data) => Patient.fromMap(data))
    );
    
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<any>(`${this.baseUrl}/${patient.id}`, patient.toMap()).pipe(
      map((data) => Patient.fromMap(data))
    );
  }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${patientId}`);
  }
}
