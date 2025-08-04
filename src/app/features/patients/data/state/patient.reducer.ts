import { createFeature, createReducer, on } from '@ngrx/store';
import { Patient } from '../../domain/patient-entity';
import { PatientActions } from './patient.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface PatientState extends EntityState<Patient> {
  loading: boolean;
  error: any;
  selectedPatient: Patient | null;
}

export const patientAdapter = createEntityAdapter<Patient>();

export const initialState: PatientState = patientAdapter.getInitialState({
  loading: false,
  error: null,
  selectedPatient: null,
});

export const patientFeature = createFeature({
    name: 'patient',
    reducer: createReducer(
        initialState,
        on(PatientActions.loadPatients, (state) => {
            console.log('Reducer: Load Patients action received');
            return { ...state, loading: true };
        }),
        on(PatientActions.loadPatientsSuccess, (state, { patients }) => {
            console.log('Reducer: Load Patients Success action received', patients);
            return patientAdapter.setAll(patients, { ...state, loading: false });
        }),
        on(PatientActions.loadPatientsFailure, (state, { error }) => {
            console.error('Reducer: Load Patients Failure action received', error);
            return { ...state, loading: false, error };
        }),
        on(PatientActions.addPatient, (state) => {
            console.log('Reducer: Add Patient action received');
            return { ...state, loading: true };
        }),
        on(PatientActions.addPatientSuccess, (state, { patient }) => {
            console.log('Reducer: Add Patient Success action received', patient);
            return patientAdapter.addOne(patient, { ...state, loading: false });
        }),
        on(PatientActions.addPatientFailure, (state, { error }) => {
            console.error('Reducer: Add Patient Failure action received', error);
            return { ...state, loading: false, error };
        }),
        on(PatientActions.updatePatient, (state) => {
            console.log('Reducer: Update Patient action received');
            return { ...state, loading: true };
        }),
        on(PatientActions.updatePatientSuccess, (state, { patient }) => {
            console.log('Reducer: Update Patient Success action received', patient);
            return patientAdapter.updateOne({ id: patient.id, changes: patient }, { ...state, loading: false });
        }),
        on(PatientActions.updatePatientFailure, (state, { error }) => {
            console.error('Reducer: Update Patient Failure action received', error);
            return { ...state, loading: false, error };
        }),
        on(PatientActions.deletePatient, (state) => {
            console.log('Reducer: Delete Patient action received');
            return { ...state, loading: true };
        }),
        on(PatientActions.deletePatientSuccess, (state, { id }) => {
            console.log('Reducer: Delete Patient Success action received', id);
            return patientAdapter.removeOne(id, { ...state, loading: false });
        }),
        on(PatientActions.deletePatientFailure, (state, { error }) => {
            console.error('Reducer: Delete Patient Failure action received', error);
            return { ...state, loading: false, error };
        }),
        on(PatientActions.loadPatient, (state) => {
            console.log('Reducer: Load Patient action received');
            return { ...state, loading: true, selectedPatient: null };
        }),
        on(PatientActions.loadPatientSuccess, (state, { patient }) => {
            console.log('Reducer: Load Patient Success action received', patient);
            return { ...state, loading: false, selectedPatient: patient };
        }),
        on(PatientActions.loadPatientFailure, (state, { error }) => {
            console.error('Reducer: Load Patient Failure action received', error);
            return { ...state, loading: false, error, selectedPatient: null };
        })
    ),
    });

