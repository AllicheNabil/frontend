import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../patient-entity';

@Injectable({ providedIn: 'root' })
export abstract class GetPatientByIdUsecase {
  abstract execute(patientId: string): Observable<Patient>;
}
