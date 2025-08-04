import { createFeature, createReducer, on } from '@ngrx/store';
import { LabTestEntity } from '../../domain/lab-test.entity';
import { LabTestActions } from './lab-test.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface LabTestState extends EntityState<LabTestEntity> {
  loading: boolean;
  error: any;
}

// Define a function to select the primary key
export function selectLabTestId(a: LabTestEntity): number {
  return a.labTestId;
}

export const labTestAdapter = createEntityAdapter<LabTestEntity>({
  selectId: selectLabTestId,
});

export const initialState: LabTestState = labTestAdapter.getInitialState({
  loading: false,
  error: null,
});

export const labTestFeature = createFeature({
  name: 'labTest',
  reducer: createReducer(
    initialState,
    on(LabTestActions.loadLabTests, (state) => ({ ...state, loading: true })),
    on(LabTestActions.loadLabTestsSuccess, (state, { labTests }) =>
      labTestAdapter.setAll(labTests, { ...state, loading: false })
    ),
    on(LabTestActions.loadLabTestsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(LabTestActions.addLabTest, (state) => ({ ...state, loading: true })),
    on(LabTestActions.addLabTestSuccess, (state, { labTest }) =>
      labTestAdapter.addOne(labTest, { ...state, loading: false })
    ),
    on(LabTestActions.addLabTestFailure, (state, { error }) => ({ ...state, loading: false, error }))
  ),
  extraSelectors: ({ selectLabTestState }) => ({
    ...labTestAdapter.getSelectors(selectLabTestState),
  }),
});
