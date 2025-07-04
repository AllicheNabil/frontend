import { patientFeature } from './patient.reducer';

export const {
    selectPatientState,
    selectLoading,
    selectError,
    selectAll,
} = patientFeature;

export const selectAllPatients = selectAll;

console.log('patientFeature.selectPatientState:', patientFeature.selectPatientState);
