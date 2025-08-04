import { createFeature, createReducer, on } from '@ngrx/store';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { VisitActions } from './visit.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface VisitState extends EntityState<PatientVisitEntity> {
  loading: boolean;
  error: any;
}

export const visitAdapter = createEntityAdapter<PatientVisitEntity>({
  selectId: (visit: PatientVisitEntity) => visit.visitId,
});

export const initialState: VisitState = visitAdapter.getInitialState({
  loading: false,
  error: null,
});

export const visitFeature = createFeature({
  name: 'visit',
  reducer: createReducer(
    initialState,
    on(VisitActions.loadVisits, (state) => ({ ...state, loading: true })),
    on(VisitActions.loadVisitsSuccess, (state, { visits }) =>
      visitAdapter.setAll(visits, { ...state, loading: false })
    ),
    on(VisitActions.loadVisitsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(VisitActions.addVisit, (state) => ({ ...state, loading: true })),
    on(VisitActions.addVisitSuccess, (state, { visit }) =>
      visitAdapter.addOne(visit, { ...state, loading: false })
    ),
    on(VisitActions.addVisitFailure, (state, { error }) => ({ ...state, loading: false, error }))
  ),
});