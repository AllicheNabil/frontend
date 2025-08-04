import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHeadCircumferenceGrowthDataUseCase } from '../../domain/visitUsecases/get-head-circumference-growth-data.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetHeadCircumferenceGrowthDataUseCaseImpl extends GetHeadCircumferenceGrowthDataUseCase {
  private repository = inject(VisitRepository);

  execute(gender: 'male' | 'female'): Observable<any[]> {
    return this.repository.getHeadCircumferenceGrowthData(gender);
  }
}
