import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHeightGrowthDataUseCase } from '../../domain/visitUsecases/get-height-growth-data.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetHeightGrowthDataUseCaseImpl extends GetHeightGrowthDataUseCase {
  private repository = inject(VisitRepository);

  execute(gender: 'male' | 'female'): Observable<any[]> {
    return this.repository.getHeightGrowthData(gender);
  }
}
