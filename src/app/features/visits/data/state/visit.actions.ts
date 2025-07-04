import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PatientVisitEntity } from '../../domain/patient-visit-entity';

export const VisitActions = createActionGroup({
  source: 'Visit',
  events: {
    'Load Visits': props<{ patientId: number }>(),
    'Load Visits Success': props<{ visits: PatientVisitEntity[] }>(),
    'Load Visits Failure': props<{ error: any }>(),
    'Add Visit': props<{ visit: PatientVisitEntity }>(),
    'Add Visit Success': props<{ visit: PatientVisitEntity }>(),
    'Add Visit Failure': props<{ error: any }>(),
  },
});
