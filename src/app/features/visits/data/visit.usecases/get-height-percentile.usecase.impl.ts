import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHeightPercentileUseCase } from '../../domain/visitUsecases/get-height-percentile.usecase';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';

@Injectable({ providedIn: 'root' })
export class GetHeightPercentileUseCaseImpl extends GetHeightPercentileUseCase {
  private repository = inject(VisitRepository);

  execute(params: { gender: 'male' | 'female', ageInMonths: number, height: number }): Observable<any> {
    return this.repository.getHeightPercentile(params.gender, params.ageInMonths, params.height);
  }
}
