import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientEntity } from '../patient-entity';

@Injectable({ providedIn: 'root' })
export abstract class AddPatientUsecase {
  abstract execute(patient: PatientEntity): Observable<PatientEntity>;
}
