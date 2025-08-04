import { Observable } from 'rxjs';
import { Medication } from '../MedicationEntity';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class GetMedicationsUseCase {
  abstract execute(patientId: number): Observable<Medication[]>;
}
