import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VisitActions } from './visit.actions';
import { GetVisitsUseCase } from '../../domain/visitUsecases/getVisitsUseCase';
import { AddVisitUseCase } from '../../domain/visitUsecases/addVisitUseCase';

@Injectable()
export class VisitEffects {
  private actions$ = inject(Actions);
  private getVisitsUseCase = inject(GetVisitsUseCase);
  private addVisitUseCase = inject(AddVisitUseCase);

  loadVisits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitActions.loadVisits),
      mergeMap(({ patientId }) => {
        console.log('Effect: Loading visits for patient...', patientId);
        return this.getVisitsUseCase.execute(patientId).pipe(
          map((visits) => {
            console.log('Effect: Visits loaded successfully', visits);
            return VisitActions.loadVisitsSuccess({ visits });
          }),
          catchError((error) => {
            console.error('Effect: Failed to load visits', error);
            return of(VisitActions.loadVisitsFailure({ error }));
          })
        );
      })
    )
  );

  addVisit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitActions.addVisit),
      mergeMap(({ visit }) => {
        console.log('Effect: Adding visit...', visit);
        return this.addVisitUseCase.execute(visit).pipe(
          map((newVisit) => {
            console.log('Effect: Visit added successfully', newVisit);
            return VisitActions.addVisitSuccess({ visit: newVisit });
          }),
          catchError((error) => {
            console.error('Effect: Failed to add visit', error);
            return of(VisitActions.addVisitFailure({ error }));
          })
        );
      })
    )
  );
}
