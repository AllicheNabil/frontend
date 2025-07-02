export class MedicationEntity {
  medicationId: number;
  medicationName: string;
  medicationDate: string;
  medicationDuration: string;
  patientId: number;
  dosageForm: string;
  timesPerDay: string;
  amount: string;

  constructor(props: {
    medicationId: number;
    medicationName: string;
    medicationDate: string;
    medicationDuration: string;
    patientId: number;
    dosageForm: string;
    timesPerDay: string;
    amount: string;
  }) {
    this.medicationId = props.medicationId;
    this.medicationName = props.medicationName;
    this.medicationDate = props.medicationDate;
    this.medicationDuration = props.medicationDuration;
    this.patientId = props.patientId;
    this.dosageForm = props.dosageForm;
    this.timesPerDay = props.timesPerDay;
    this.amount = props.amount;
  }

  toMap(): Record<string, any> {
    return {
      medication_id: this.medicationId,
      medication_name: this.medicationName,
      medication_date: this.medicationDate,
      medication_duration: this.medicationDuration,
      patient_id: this.patientId,
      dosage_form: this.dosageForm,
      times_per_day: this.timesPerDay,
      amount: this.amount,
    };
  }

  static fromMap(map: Record<string, any>): MedicationEntity {
    return new MedicationEntity({
      medicationId: map['medication_id'],
      medicationName: map['medication_name'],
      medicationDate: map['medication_date'],
      medicationDuration: map['medication_duration'],
      patientId: map['patient_id'],
      dosageForm: map['dosage_form'],
      timesPerDay: map['times_per_day'],
      amount: map['amount'],
    });
  }
}
