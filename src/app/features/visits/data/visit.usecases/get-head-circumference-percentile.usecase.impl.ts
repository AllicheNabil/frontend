import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHeadCircumferencePercentileUseCase } from '../../domain/visitUsecases/get-head-circumference-percentile.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetHeadCircumferencePercentileUseCaseImpl extends GetHeadCircumferencePercentileUseCase {
  private repository = inject(VisitRepository);

  execute(params: { gender: 'male' | 'female', ageInMonths: number, headCircumference: number }): Observable<any> {
    return this.repository.getHeadCircumferencePercentile(params.gender, params.ageInMonths, params.headCircumference);
  }
}
