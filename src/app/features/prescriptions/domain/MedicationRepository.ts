import { Observable } from 'rxjs';
import { MedicationEntity } from './MedicationEntity';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class MedicationRepository {
  abstract getMedications(patientId: number): Observable<MedicationEntity[]>;
  abstract addMedication(medication: MedicationEntity): Observable<MedicationEntity>;
}
