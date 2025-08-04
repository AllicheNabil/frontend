import { labTestFeature } from './lab-test.reducer';
import { createSelector } from '@ngrx/store';
import { LabTestEntity } from '../../domain/lab-test.entity';

export const {
  selectLabTestState,
  selectLoading,
  selectError,
  selectAll,
} = labTestFeature;

export const selectAllLabTests = selectAll;

export const selectAllSortedByDate = createSelector(
    selectAll,
    (labTests: LabTestEntity[]) => {
        return [...labTests].sort((a, b) => new Date(b.labTestDate).getTime() - new Date(a.labTestDate).getTime());
    }
);
