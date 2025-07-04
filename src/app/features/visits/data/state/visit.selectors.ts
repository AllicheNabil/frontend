import { visitFeature } from './visit.reducer';

export const {
  selectVisitState,
  selectLoading,
  selectError,
  selectAll,
} = visitFeature;

export const selectAllVisits = selectAll;
