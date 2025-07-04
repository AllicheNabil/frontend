import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class DeletePatientUsecase {
  abstract execute(patientId: number): Observable<void>;
}
