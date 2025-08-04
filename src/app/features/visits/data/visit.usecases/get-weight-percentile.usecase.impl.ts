import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetWeightPercentileUseCase } from '../../domain/visitUsecases/get-weight-percentile.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetWeightPercentileUseCaseImpl extends GetWeightPercentileUseCase {
  private repository = inject(VisitRepository);

  execute(params: { gender: 'male' | 'female', ageInMonths: number, weight: number }): Observable<any> {
    return this.repository.getWeightPercentile(params.gender, params.ageInMonths, params.weight);
  }
}
