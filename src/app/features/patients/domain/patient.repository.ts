import { Observable } from 'rxjs';
import { PatientEntity } from './patient-entity';

export abstract class PatientRepository {
  abstract getPatients(): Observable<PatientEntity[]>;
  abstract getPatientById(patientId: string): Observable<PatientEntity>;
  abstract addPatient(patient: PatientEntity): Observable<PatientEntity>;
  abstract updatePatient(patient: PatientEntity): Observable<PatientEntity>;
  abstract deletePatient(patientId: string): Observable<void>;
}
