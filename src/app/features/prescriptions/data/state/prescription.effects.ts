import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PrescriptionActions } from './prescription.actions';
import { GetMedicationsUseCase } from '@app/features/prescriptions/domain/usecases/GetMedicationsUseCase';
import { AddMedicationUseCase } from '@app/features/prescriptions/domain/usecases/AddMedicationUseCase';

@Injectable()
export class PrescriptionEffects {
  private actions$ = inject(Actions);
  private getMedicationsUseCase = inject(GetMedicationsUseCase);
  private addMedicationUseCase = inject(AddMedicationUseCase);

  loadPrescriptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrescriptionActions.loadPrescriptions),
      mergeMap(({ patientId }) =>
        this.getMedicationsUseCase.execute(patientId).pipe(
          map((prescriptions) => PrescriptionActions.loadPrescriptionsSuccess({ prescriptions })),
          catchError((error) => of(PrescriptionActions.loadPrescriptionsFailure({ error })))
        )
      )
    )
  );

  addPrescription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrescriptionActions.addPrescription),
      mergeMap(({ prescription }) =>
        this.addMedicationUseCase.execute(prescription).pipe(
          map(() => PrescriptionActions.loadPrescriptions({ patientId: prescription.patientId })),
          catchError((error) => of(PrescriptionActions.addPrescriptionFailure({ error })))
        )
      )
    )
  );
}
