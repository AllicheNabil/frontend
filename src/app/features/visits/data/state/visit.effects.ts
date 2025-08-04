import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VisitActions } from './visit.actions';
import { GetVisitsUseCase } from '@app/features/visits/domain/visitUsecases/getVisitsUseCase';
import { AddVisitUseCase } from '@app/features/visits/domain/visitUsecases/addVisitUseCase';

@Injectable()
export class VisitEffects {
  private actions$ = inject(Actions);
  private getVisitsUseCase = inject(GetVisitsUseCase);
  private addVisitUseCase = inject(AddVisitUseCase);

  loadVisits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitActions.loadVisits),
      mergeMap(({ patientId }) =>
        this.getVisitsUseCase.execute(patientId).pipe(
          map((visits) => VisitActions.loadVisitsSuccess({ visits })),
          catchError((error) => of(VisitActions.loadVisitsFailure({ error })))
        )
      )
    )
  );

  addVisit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitActions.addVisit),
      mergeMap(({ visit }) =>
        this.addVisitUseCase.execute(visit).pipe(
          map((newVisit) => VisitActions.loadVisits({ patientId: newVisit.patientId !})),
          catchError((error) => of(VisitActions.addVisitFailure({ error })))
        )
      )
    )
  );
}