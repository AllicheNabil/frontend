import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetBmiGrowthDataUseCase } from '../../domain/visitUsecases/get-bmi-growth-data.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetBmiGrowthDataUseCaseImpl extends GetBmiGrowthDataUseCase {
  private repository = inject(VisitRepository);

  execute(gender: 'male' | 'female'): Observable<any[]> {
    return this.repository.getBmiGrowthData(gender);
  }
}
