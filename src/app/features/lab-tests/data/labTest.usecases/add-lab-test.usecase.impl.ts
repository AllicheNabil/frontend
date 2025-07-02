import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LabTestRepository } from '../../domain/labTest.repository';
import { LabTestEntity } from '../../domain/lab-test.entity';
import { AddLabTestUseCase } from '@app/features/lab-tests/domain/labTestUsecases/add-lab-test.usecase';

@Injectable({ providedIn: 'root' })
export class AddLabTestUseCaseImpl extends AddLabTestUseCase {
  private repository = inject(LabTestRepository);

  execute(labTest: LabTestEntity): Observable<LabTestEntity> {
    return this.repository.addLabTest(labTest);
  }
}
