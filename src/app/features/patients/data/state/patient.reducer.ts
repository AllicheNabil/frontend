import { createFeature, createReducer, on } from '@ngrx/store';
import { Patient } from '../../domain/patient-entity';
import { PatientActions } from './patient.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface PatientState extends EntityState<Patient> {
  loading: boolean;
  error: any;
}

export const patientAdapter = createEntityAdapter<Patient>();

export const initialState: PatientState = patientAdapter.getInitialState({
  loading: false,
  error: null,
});

export const patientFeature = createFeature({
    name: 'patient',
    reducer: createReducer(
        initialState,
        on(PatientActions.loadPatients, (state) => ({ ...state, loading: true })),
        on(PatientActions.loadPatientsSuccess, (state, { patients }) => patientAdapter.setAll(patients, { ...state, loading: false })),
        on(PatientActions.loadPatientsFailure, (state, { error }) => ({ ...state, loading: false, error })),
        on(PatientActions.addPatient, (state) => ({ ...state, loading: true })),
        on(PatientActions.addPatientSuccess, (state, { patient }) => patientAdapter.addOne(patient, { ...state, loading: false })),
        on(PatientActions.addPatientFailure, (state, { error }) => ({ ...state, loading: false, error })),
        on(PatientActions.updatePatient, (state) => ({ ...state, loading: true })),
        on(PatientActions.updatePatientSuccess, (state, { patient }) => patientAdapter.updateOne({ id: patient.id, changes: patient }, { ...state, loading: false })),
        on(PatientActions.updatePatientFailure, (state, { error }) => ({ ...state, loading: false, error })),
        on(PatientActions.deletePatient, (state) => ({ ...state, loading: true })),
        on(PatientActions.deletePatientSuccess, (state, { id }) => patientAdapter.removeOne(id, { ...state, loading: false })),
        on(PatientActions.deletePatientFailure, (state, { error }) => ({ ...state, loading: false, error }))
    ),
    extraSelectors: ({ selectPatientState }) => ({
        ...patientAdapter.getSelectors(selectPatientState),
    }),
});
