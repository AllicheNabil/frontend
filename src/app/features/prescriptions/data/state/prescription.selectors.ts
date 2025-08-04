import { createFeatureSelector, createSelector } from '@ngrx/store';
import { prescriptionAdapter, PrescriptionState, prescriptionFeature } from './prescription.reducer';
import { Medication } from '../../domain/MedicationEntity';

export const { selectAll, selectEntities, selectIds, selectTotal } = prescriptionAdapter.getSelectors(
    prescriptionFeature.selectPrescriptionState
);

export const selectAllSortedByDate = createSelector(
    selectAll,
    (medications: Medication[]) => {
        return [...medications].sort((a, b) => new Date(b.medicationDate).getTime() - new Date(a.medicationDate).getTime());
    }
);

export const selectLoading = createSelector(
    prescriptionFeature.selectPrescriptionState,
  (state: PrescriptionState) => state.loading
);

export const selectError = createSelector(
    prescriptionFeature.selectPrescriptionState,
  (state: PrescriptionState) => state.error
);
