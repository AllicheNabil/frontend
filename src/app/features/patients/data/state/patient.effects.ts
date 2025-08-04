import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientActions } from './patient.actions';
import { GetPatientsUsecase } from '../../domain/patientUsecases/get-patients.usecase';
import { AddPatientUsecase } from '../../domain/patientUsecases/add-patient.usecase';
import { UpdatePatientUsecase } from '../../domain/patientUsecases/update-patient.usecase';
import { DeletePatientUsecase } from '../../domain/patientUsecases/delete-patient.usecase';
import { Patient } from '../../domain/patient-entity';
import { GetPatientByIdUsecase } from '../../domain/patientUsecases/get-patient-by-id.usecase';

@Injectable()
export class PatientEffects {
  private actions$ = inject(Actions);
  private getPatientsUsecase = inject(GetPatientsUsecase);
  private addPatientUsecase = inject(AddPatientUsecase);
  private updatePatientUsecase = inject(UpdatePatientUsecase);
  private deletePatientUsecase = inject(DeletePatientUsecase);
  private getPatientByIdUsecase = inject(GetPatientByIdUsecase);
  


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
          map((response) => {
            const newPatient = new Patient({ ...patient, id: response.id, gender: patient.gender! });
            console.log('Effect: Patient added successfully', newPatient);
            return PatientActions.addPatientSuccess({ patient: newPatient });
          }),
          catchError((error) => {
            console.error('Effect: Failed to add patient', error);
            return of(PatientActions.addPatientFailure({ error }));
          })
        )
      )
    )
  );

  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.updatePatient),
      mergeMap(({ patient }) =>
        this.updatePatientUsecase.execute(patient).pipe(
          map((patient) => {
            return PatientActions.loadPatients();
          }),
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

  loadPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatient),
      mergeMap(({ patientId }) =>
        this.getPatientByIdUsecase.execute(patientId.toString()).pipe(
          map((patient) => PatientActions.loadPatientSuccess({ patient })),
          catchError((error) => of(PatientActions.loadPatientFailure({ error })))
        )
      )
    )
  );
}
