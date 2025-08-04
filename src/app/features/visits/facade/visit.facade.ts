import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, startWith } from 'rxjs';

import { PrintDocumentUsecase } from '../../../core/domain/usecases/print-document.usecase';
import { VisitHtmlGenerator } from '../generators/visit-html-generator.service';
import { PatientVisitEntity } from '../domain/patient-visit-entity';
import { VisitActions } from '../data/state/visit.actions';
import * as VisitSelectors from '../data/state/visit.selectors';
import { PatientFacade } from '../../patients/facade/patient.facade';
import { GetWeightPercentileUseCase } from '../domain/visitUsecases/get-weight-percentile.usecase';
import { GetHeightPercentileUseCase } from '../domain/visitUsecases/get-height-percentile.usecase';
import { GetHeadCircumferencePercentileUseCase } from '../domain/visitUsecases/get-head-circumference-percentile.usecase';
import { GetBmiPercentileUseCase } from '../domain/visitUsecases/get-bmi-percentile.usecase';
import { GetWeightGrowthDataUseCase } from '../domain/visitUsecases/get-weight-growth-data.usecase';
import { GetHeightGrowthDataUseCase } from '../domain/visitUsecases/get-height-growth-data.usecase';
import { GetHeadCircumferenceGrowthDataUseCase } from '../domain/visitUsecases/get-head-circumference-growth-data.usecase';
import { GetBmiGrowthDataUseCase } from '../domain/visitUsecases/get-bmi-growth-data.usecase';

@Injectable({
  providedIn: 'root'
})
export class VisitFacade {
  private store = inject(Store);
  private printDocumentUsecase = inject(PrintDocumentUsecase);
  private visitHtmlGenerator = inject(VisitHtmlGenerator);
  private patientFacade = inject(PatientFacade);
  private getWeightPercentileUseCase = inject(GetWeightPercentileUseCase);
  private getHeightPercentileUseCase = inject(GetHeightPercentileUseCase);
  private getHeadCircumferencePercentileUseCase = inject(GetHeadCircumferencePercentileUseCase);
  private getBmiPercentileUseCase = inject(GetBmiPercentileUseCase);
  private getWeightGrowthDataUseCase = inject(GetWeightGrowthDataUseCase);
  private getHeightGrowthDataUseCase = inject(GetHeightGrowthDataUseCase);
  private getHeadCircumferenceGrowthDataUseCase = inject(GetHeadCircumferenceGrowthDataUseCase);
  private getBmiGrowthDataUseCase = inject(GetBmiGrowthDataUseCase);

  visits$ = this.store.select(VisitSelectors.selectAll).pipe(startWith([]));
  loading$ = this.store.select(VisitSelectors.selectLoading);
  error$ = this.store.select(VisitSelectors.selectError);

  loadVisits(patientId: number): void {
    this.store.dispatch(VisitActions.loadVisits({ patientId }));
  }

  addVisit(visit: PatientVisitEntity): void {
    this.store.dispatch(VisitActions.addVisit({ visit }));
  }

  printVisit(visitData: PatientVisitEntity): void {
    this.patientFacade.patient$.subscribe(patient => {
      if (patient) {
        const visitHtml = this.visitHtmlGenerator.generate(visitData, patient.name);
        const title = `Rapport de visite du ${new Date(visitData.visitDate!).toLocaleDateString()}`;
        this.printDocumentUsecase.execute(visitHtml, title);
      }
    });
    this.patientFacade.loadPatient(visitData.patientId!);
  }

  getWeightPercentile(gender: 'male' | 'female', ageInMonths: number, weight: number): Observable<{ percentile: number | null; zScore: number | null }> {
    const params = { gender, ageInMonths, weight };
    return this.getWeightPercentileUseCase.execute(params);
  }

  getHeightPercentile(gender: 'male' | 'female', ageInMonths: number, height: number): Observable<{ percentile: number | null; zScore: number | null }> {
    const params = { gender, ageInMonths, height };
    return this.getHeightPercentileUseCase.execute(params);
  }

  getHeadCircumferencePercentile(gender: 'male' | 'female', ageInMonths: number, headCircumference: number): Observable<{ percentile: number | null; zScore: number | null }> {
    const params = { gender, ageInMonths, headCircumference };
    return this.getHeadCircumferencePercentileUseCase.execute(params);
  }

  getBmiPercentile(gender: 'male' | 'female', ageInMonths: number, bmi: number): Observable<{ percentile: number | null; zScore: number | null }> {
    const params = { gender, ageInMonths, bmi };
    return this.getBmiPercentileUseCase.execute(params);
  }

  getWeightGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.getWeightGrowthDataUseCase.execute(gender);
  }

  getHeightGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.getHeightGrowthDataUseCase.execute(gender);
  }

  getHeadCircumferenceGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.getHeadCircumferenceGrowthDataUseCase.execute(gender);
  }

  getBmiGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.getBmiGrowthDataUseCase.execute(gender);
  }
}
