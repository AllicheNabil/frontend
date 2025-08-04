import { createFeatureSelector, createSelector } from '@ngrx/store';
import { visitAdapter, VisitState, visitFeature } from './visit.reducer';

export const { selectAll, selectEntities, selectIds, selectTotal } = visitAdapter.getSelectors(
    visitFeature.selectVisitState
);

export const selectLoading = createSelector(
    visitFeature.selectVisitState,
  (state: VisitState) => state.loading
);

export const selectError = createSelector(
    visitFeature.selectVisitState,
  (state: VisitState) => state.error
);