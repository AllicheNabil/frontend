import { Observable } from 'rxjs';
import { Patient } from './patient-entity';

export abstract class PatientRepository {
  abstract getPatients(): Observable<Patient[]>;
  abstract getPatientById(patientId: string): Observable<Patient>;
  abstract addPatient(patient: Patient): Observable<Patient>;
  abstract updatePatient(patient: Patient): Observable<Patient>;
  abstract deletePatient(patientId: number): Observable<void>;
}
