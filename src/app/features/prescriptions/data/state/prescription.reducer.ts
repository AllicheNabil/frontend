import { createFeature, createReducer, on } from '@ngrx/store';
import { Medication } from '@app/features/prescriptions/domain/MedicationEntity';
import { PrescriptionActions } from './prescription.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface PrescriptionState extends EntityState<Medication> {
  loading: boolean;
  error: any;
}

export const prescriptionAdapter = createEntityAdapter<Medication>({selectId: (medication: Medication) => medication.medicationId});

export const initialState: PrescriptionState = prescriptionAdapter.getInitialState({
  loading: false,
  error: null,
});

export const prescriptionFeature = createFeature({
  name: 'prescription',
  reducer: createReducer(
    initialState,
    on(PrescriptionActions.loadPrescriptions, (state) => ({ ...state, loading: true })),
    on(PrescriptionActions.loadPrescriptionsSuccess, (state, { prescriptions }) =>
      prescriptionAdapter.setAll(prescriptions, { ...state, loading: false })
    ),
    on(PrescriptionActions.loadPrescriptionsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(PrescriptionActions.addPrescription, (state) => ({ ...state, loading: true })),
    on(PrescriptionActions.addPrescriptionSuccess, (state, { prescription }) =>
      prescriptionAdapter.addOne(prescription, { ...state, loading: false })
    ),
    on(PrescriptionActions.addPrescriptionFailure, (state, { error }) => ({ ...state, loading: false, error }))
  ),
});
