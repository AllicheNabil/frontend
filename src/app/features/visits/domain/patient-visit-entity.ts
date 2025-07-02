export interface PatientVisitEntityProps {
  visitId: number;
  reason: string;
  physicalExamination: string;
  weight: string;
  weightPercentile: string;
  height: string;
  heightPercentile: string;
  headCirumference: string;
  headCirumferencePercentile: string;
  bmi: string;
  diagnosis: string;
  visitDate: string;
  visitHour: string;
  patientId: number;
}

export class PatientVisitEntity {
  public visitId: number;
  public reason: string;
  public physicalExamination: string;
  public weight: string;
  public weightPercentile: string;
  public height: string;
  public heightPercentile: string;
  public headCirumference: string;
  public headCirumferencePercentile: string;
  public bmi: string;
  public diagnosis: string;
  public visitDate: string;
  public visitHour: string;
  public patientId: number;

  constructor(props: PatientVisitEntityProps) {
    this.visitId = props.visitId;
    this.reason = props.reason;
    this.physicalExamination = props.physicalExamination;
    this.weight = props.weight;
    this.weightPercentile = props.weightPercentile;
    this.height = props.height;
    this.heightPercentile = props.heightPercentile;
    this.headCirumference = props.headCirumference;
    this.headCirumferencePercentile = props.headCirumferencePercentile;
    this.bmi = props.bmi;
    this.diagnosis = props.diagnosis;
    this.visitDate = props.visitDate;
    this.visitHour = props.visitHour;
    this.patientId = props.patientId;
  }

  static fromMap(map: { [key: string]: any }): PatientVisitEntity {
    return new PatientVisitEntity({
      visitId: map['visit_id'],
      reason: map['visit_reason'],
      physicalExamination: map['visit_physical_examination'],
      weight: map['visit_weight'],
      weightPercentile: map['visit_weight_percentile'],
      height: map['visit_height'],
      heightPercentile: map['visit_height_percentile'],
      headCirumference: map['visit_head_circumference'],
      headCirumferencePercentile: map['visit_head_circumference_percentile'],
      bmi: map['visit_bmi'],
      diagnosis: map['visit_diagnosis'],
      visitDate: map['visit_date'],
      visitHour: map['visit_hour'],
      patientId: map['patient_id']
    });
  }

  toMap(): { [key: string]: any } {
    return {
      visit_id: this.visitId,
      visit_reason: this.reason,
      visit_physical_examination: this.physicalExamination,
      visit_weight: this.weight,
      visit_weight_percentile: this.weightPercentile,
      visit_height: this.height,
      visit_height_percentile: this.heightPercentile,
      visit_head_circumference: this.headCirumference,
      visit_head_circumference_percentile: this.headCirumferencePercentile,
      visit_bmi: this.bmi,
      visit_diagnosis: this.diagnosis,
      visit_date: this.visitDate,
      visit_hour: this.visitHour,
      patient_id: this.patientId,
    };
  }
}