import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LabTestActions } from './lab-test.actions';
import { GetLabTestsUseCase } from '../../domain/labTestUsecases/get-lab-tests.usecase';
import { AddLabTestUseCase } from '../../domain/labTestUsecases/add-lab-test.usecase';

@Injectable()
export class LabTestEffects {
  private actions$ = inject(Actions);
  private getLabTestsUseCase = inject(GetLabTestsUseCase);
  private addLabTestUseCase = inject(AddLabTestUseCase);

  loadLabTests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LabTestActions.loadLabTests),
      mergeMap(({ patientId }) => {
        console.log('Effect: Loading lab tests for patient...', patientId);
        return this.getLabTestsUseCase.execute(patientId).pipe(
          map((labTests) => {
            console.log('Effect: Lab tests loaded successfully', labTests);
            return LabTestActions.loadLabTestsSuccess({ labTests });
          }),
          catchError((error) => {
            console.error('Effect: Failed to load lab tests', error);
            return of(LabTestActions.loadLabTestsFailure({ error }));
          })
        );
      })
    )
  );

  addLabTest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LabTestActions.addLabTest),
      mergeMap(({ labTest }) => {
        console.log('Effect: Adding lab test...', labTest);
        return this.addLabTestUseCase.execute(labTest).pipe(
          map((newLabTest) => {
            console.log('Effect: Lab test added successfully', newLabTest);
            return LabTestActions.addLabTestSuccess({ labTest: newLabTest });
          }),
          catchError((error) => {
            console.error('Effect: Failed to add lab test', error);
            return of(LabTestActions.addLabTestFailure({ error }));
          })
        );
      })
    )
  );
}
