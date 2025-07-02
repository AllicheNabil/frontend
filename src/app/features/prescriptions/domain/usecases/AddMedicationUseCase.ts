import { Observable } from 'rxjs';
import { MedicationEntity } from '../MedicationEntity';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class AddMedicationUseCase {
  abstract execute(medication: MedicationEntity): Observable<MedicationEntity>;
}
