export interface LabTestProps {
  labTestId: number;
  labTestName: string;
  labTestDate: string;
  patientId: number;
}

export class LabTestEntity {
  public readonly labTestId: number;
  public readonly labTestName: string;
  public readonly labTestDate: string;
  public readonly patientId: number;

  constructor(props: LabTestProps) {
    this.labTestId = props.labTestId;
    this.labTestName = props.labTestName;
    this.labTestDate = props.labTestDate;
    this.patientId = props.patientId;
  }

  public static fromMap(map: any): LabTestEntity {
    return new LabTestEntity({
      labTestId: map.lab_test_id,
      labTestName: map.lab_test_name,
      labTestDate: map.lab_test_date,
      patientId: map.patient_id,
    });
  }

  public toMap(): any {
    return {
      lab_test_id: this.labTestId,
      lab_test_name: this.labTestName,
      lab_test_date: this.labTestDate,
      patient_id: this.patientId,
    };
  }
}
