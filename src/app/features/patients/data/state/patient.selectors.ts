import { createSelector } from '@ngrx/store';
import { patientFeature, patientAdapter } from './patient.reducer';

export const {
    selectPatientState,
    selectLoading,
    selectError,
} = patientFeature;

export const selectSelectedPatient = createSelector(
  selectPatientState,
  (state) => state.selectedPatient
);

export const { selectAll } = patientAdapter.getSelectors(selectPatientState);

export const selectAllPatients = selectAll;

