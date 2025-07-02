import { Observable } from 'rxjs';
import { LabTestEntity } from './lab-test.entity';

export abstract class LabTestRepository {
  abstract getLabTests(patientId: number): Observable<LabTestEntity[]>;
  abstract addLabTest(labTest: LabTestEntity): Observable<LabTestEntity>;
}
