import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Patient } from '../../domain/patient-entity';

export const PatientActions = createActionGroup({
  source: 'Patient',
  events: {
    'Load Patients': emptyProps(),
    'Load Patients Success': props<{ patients: Patient[] }>(),
    'Load Patients Failure': props<{ error: any }>(),
    'Add Patient': props<{ patient: Patient }>(),
    'Add Patient Success': props<{ patient: Patient }>(),
    'Add Patient Failure': props<{ error: any }>(),
    'Update Patient': props<{ patient: Patient }>(),
    'Update Patient Success': props<{ patient: Patient }>(),
    'Update Patient Failure': props<{ error: any }>(),
    'Delete Patient': props<{ id: number }>(),
    'Delete Patient Success': props<{ id: number }>(),
    'Delete Patient Failure': props<{ error: any }>(),
  },
});
