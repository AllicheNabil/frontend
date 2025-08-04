import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Medication } from '@app/features/prescriptions/domain/MedicationEntity';

export const PrescriptionActions = createActionGroup({
  source: 'Prescription',
  events: {
    'Load Prescriptions': props<{ patientId: number }>(),
    'Load Prescriptions Success': props<{ prescriptions: Medication[] }>(),
    'Load Prescriptions Failure': props<{ error: any }>(),
    'Add Prescription': props<{ prescription: Medication }>(),
    'Add Prescription Success': props<{ prescription: Medication }>(),
    'Add Prescription Failure': props<{ error: any }>(),
  },
});
