export class Medication {
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
      medicationName: this.medicationName,
      medicationDate: this.medicationDate,
      medicationDuration: this.medicationDuration,
      patientId: this.patientId,
      dosageForm: this.dosageForm,
      timesPerDay: this.timesPerDay,
      amount: this.amount,
    };
  }

  static fromMap(map:  any): Medication {
    return new Medication({
      medicationId: map.medicationId,
      medicationName: map.medicationName,
      medicationDate: map.medicationDate,
      medicationDuration: map.medicationDuration,
      patientId: map.patientId,
      dosageForm: map.dosageForm,
      timesPerDay: map.timesPerDay,
      amount: map.amount,
    });
  }
}
