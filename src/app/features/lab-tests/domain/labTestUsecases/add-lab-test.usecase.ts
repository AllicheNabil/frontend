import { Observable } from 'rxjs';
import { LabTestEntity } from '../lab-test.entity';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export abstract class AddLabTestUseCase {
  abstract execute(params: LabTestEntity): Observable<LabTestEntity>;
}
