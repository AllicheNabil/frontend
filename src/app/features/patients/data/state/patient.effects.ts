import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientActions } from './patient.actions';
import { GetPatientsUsecase } from '../../domain/patientUsecases/get-patients.usecase';
import { AddPatientUsecase } from '../../domain/patientUsecases/add-patient.usecase';
import { UpdatePatientUsecase } from '../../domain/patientUsecases/update-patient.usecase';
import { DeletePatientUsecase } from '../../domain/patientUsecases/delete-patient.usecase';

@Injectable()
export class PatientEffects {
  private actions$ = inject(Actions);
  private getPatientsUsecase = inject(GetPatientsUsecase);
  private addPatientUsecase = inject(AddPatientUsecase);
  private updatePatientUsecase = inject(UpdatePatientUsecase);
  private deletePatientUsecase = inject(DeletePatientUsecase);
  


  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatients),
      mergeMap(() =>
        this.getPatientsUsecase.execute().pipe(
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
        this.addPatientUsecase.execute(patient).pipe(
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
        this.updatePatientUsecase.execute(patient).pipe(
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
        this.deletePatientUsecase.execute(id).pipe(
          map(() => PatientActions.deletePatientSuccess({ id })),
          catchError((error) => of(PatientActions.deletePatientFailure({ error })))
        )
      )
    )
  );
}
