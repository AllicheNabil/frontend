import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetBmiPercentileUseCase } from '../../domain/visitUsecases/get-bmi-percentile.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetBmiPercentileUseCaseImpl extends GetBmiPercentileUseCase {
  private repository = inject(VisitRepository);

  execute(params: { gender: 'male' | 'female', ageInMonths: number, bmi: number }): Observable<any> {
    return this.repository.getBmiPercentile(params.gender, params.ageInMonths, params.bmi);
  }
}
