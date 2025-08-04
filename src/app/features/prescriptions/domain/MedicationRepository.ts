import { Observable } from 'rxjs';
import { Medication } from './MedicationEntity';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class MedicationRepository {
  abstract getMedications(patientId: number): Observable<Medication[]>;
  abstract addMedication(medication: Medication): Observable<Medication>;
}
