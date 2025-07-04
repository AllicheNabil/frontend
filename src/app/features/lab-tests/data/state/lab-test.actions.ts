import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LabTestEntity } from '../../domain/lab-test.entity';

export const LabTestActions = createActionGroup({
  source: 'LabTest',
  events: {
    'Load Lab Tests': props<{ patientId: number }>(),
    'Load Lab Tests Success': props<{ labTests: LabTestEntity[] }>(),
    'Load Lab Tests Failure': props<{ error: any }>(),
    'Add Lab Test': props<{ labTest: LabTestEntity }>(),
    'Add Lab Test Success': props<{ labTest: LabTestEntity }>(),
    'Add Lab Test Failure': props<{ error: any }>(),
  },
});
