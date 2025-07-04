import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../patient-entity';

@Injectable({ providedIn: 'root' })
export abstract class UpdatePatientUsecase {
  abstract execute(patient: Patient): Observable<Patient>;
}
