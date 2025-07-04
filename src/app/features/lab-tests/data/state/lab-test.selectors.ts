import { labTestFeature } from './lab-test.reducer';

export const {
  selectLabTestState,
  selectLoading,
  selectError,
  selectAll,
} = labTestFeature;

export const selectAllLabTests = selectAll;
