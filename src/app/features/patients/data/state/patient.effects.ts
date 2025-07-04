import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientService } from '../patient.service';
import { PatientActions } from './patient.actions';

@Injectable()
export class PatientEffects {
  private actions$ = inject(Actions);
  private patientService = inject(PatientService);

  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatients),
      mergeMap(() =>
        this.patientService.getPatients().pipe(
          map((patients) => PatientActions.loadPatientsSuccess({ patients })),
          catchError((error) => of(PatientActions.loadPatientsFailure({ error })))
        )
      )
    )
  );

  addPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.addPatient),
      mergeMap(({ patient }) =>
        this.patientService.addPatient(patient).pipe(
          map((patient) => PatientActions.addPatientSuccess({ patient })),
          catchError((error) => of(PatientActions.addPatientFailure({ error })))
        )
      )
    )
  );

  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.updatePatient),
      mergeMap(({ patient }) =>
        this.patientService.updatePatient(patient).pipe(
          map((patient) => PatientActions.updatePatientSuccess({ patient })),
          catchError((error) => of(PatientActions.updatePatientFailure({ error })))
        )
      )
    )
  );

  deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.deletePatient),
      mergeMap(({ id }) =>
        this.patientService.deletePatient(id).pipe(
          map(() => PatientActions.deletePatientSuccess({ id })),
          catchError((error) => of(PatientActions.deletePatientFailure({ error })))
        )
      )
    )
  );
}
