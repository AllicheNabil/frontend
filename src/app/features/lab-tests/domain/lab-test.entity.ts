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
      labTestId: map.labTestId,
      labTestName: map.labTestName,
      labTestDate: map.labTestDate,
      patientId: map.patientId,
    });
  }

  public toMap(): any {
    return {
      labTestName: this.labTestName,
      labTestDate: this.labTestDate,
      patientId: this.patientId,
    };
  }
}
