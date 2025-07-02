import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LabTestRepository } from '../../domain/labTest.repository';
import { LabTestEntity } from '../../domain/lab-test.entity';
import { GetLabTestsUseCase } from '@app/features/lab-tests/domain/labTestUsecases/get-lab-tests.usecase';

@Injectable({ providedIn: 'root' })
export class GetLabTestsUseCaseImpl extends GetLabTestsUseCase {
  private repository = inject(LabTestRepository);

  execute(patientId: number): Observable<LabTestEntity[]> {
    return this.repository.getLabTests(patientId);
  }
}
