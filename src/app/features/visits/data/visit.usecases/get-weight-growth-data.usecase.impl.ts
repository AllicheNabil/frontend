import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetWeightGrowthDataUseCase } from '../../domain/visitUsecases/get-weight-growth-data.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetWeightGrowthDataUseCaseImpl extends GetWeightGrowthDataUseCase {
  private repository = inject(VisitRepository);

  execute(gender: 'male' | 'female'): Observable<any[]> {
    return this.repository.getWeightGrowthData(gender);
  }
}
