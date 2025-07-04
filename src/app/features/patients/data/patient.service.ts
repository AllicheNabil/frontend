import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { PatientRepository } from '../domain/patient.repository';
import { Patient } from '../domain/patient-entity';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class PatientService extends PatientRepository {
  private http = inject(HttpClient);
  
  private baseUrl =  environment.apiUrl;
  //  // de votre API backend

  getPatients(): Observable<Patient[]> {
    console.log('Service: Fetching patients from API...');
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((data) => {
        console.log('Service: Patients fetched successfully', data);
        return data.map((item) => Patient.fromMap(item));
      })
    );
  }

  getPatientById(patientId: string): Observable<Patient> {
    console.log('Service: Fetching patient by ID from API...', patientId);
    return this.http.get<any>(`${this.baseUrl}/id/${patientId}`).pipe(
      map((data) => {
        console.log('Service: Patient by ID fetched successfully', data);
        return Patient.fromMap(data);
      })
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    console.log('Service: Adding patient to API...', patient.toMap());
    return this.http.post<any>(this.baseUrl, patient.toMap()).pipe(
      map((data) => {
        console.log('Service: Patient added successfully to API', data);
        return Patient.fromMap(data);
      })
    );
  }

  updatePatient(patient: Patient): Observable<Patient> {
    console.log('Service: Updating patient in API...', patient.id, patient.toMap());
    return this.http.put<any>(`${this.baseUrl}/${patient.id}`, patient.toMap()).pipe(
      map((data) => {
        console.log('Service: Patient updated successfully in API', data);
        return Patient.fromMap(data);
      })
    );
  }

  deletePatient(patientId: number): Observable<void> {
    console.log('Service: Deleting patient from API...', patientId);
    return this.http.delete<void>(`${this.baseUrl}/${patientId}`).pipe(
      tap(() => console.log('Service: Patient deleted successfully from API'))
    );
  }
}
