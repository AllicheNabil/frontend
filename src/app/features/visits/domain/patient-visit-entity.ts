export interface PatientVisitEntityProps {
  visitId: number;
  reason: string;
  physicalExamination: string;
  weight: string;
  weightPercentile?: string;
  height: string;
  heightPercentile?: string;
  headCircumference: string;
  headCircumferencePercentile?: string;
  bmi: string;
  bmiPercentile?: string;
  bmiZScore?: string;
  weightZScore?: string;
  heightZScore?: string;
  headCircumferenceZScore?: string;
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
  public weightPercentile?: string;
  public height: string;
  public heightPercentile?: string;
  public headCircumference: string;
  public headCircumferencePercentile?: string;
  public bmi: string;
  public bmiPercentile?: string;
  public bmiZScore?: string;
  public weightZScore?: string;
  public heightZScore?: string;
  public headCircumferenceZScore?: string;
  public diagnosis ? : string;
  public visitDate ? : string;
  public visitHour? : string;
  public patientId ? : number;

  constructor(props: PatientVisitEntityProps) {
    this.visitId = props.visitId;
    this.reason = props.reason;
    this.physicalExamination = props.physicalExamination;
    this.weight = props.weight;
    this.weightPercentile = props.weightPercentile;
    this.height = props.height;
    this.heightPercentile = props.heightPercentile;
    this.headCircumference = props.headCircumference;
    this.headCircumferencePercentile = props.headCircumferencePercentile;
    this.bmi = props.bmi;
    this.bmiPercentile = props.bmiPercentile;
    this.bmiZScore = props.bmiZScore;
    this.weightZScore = props.weightZScore;
    this.heightZScore = props.heightZScore;
    this.headCircumferenceZScore = props.headCircumferenceZScore;
    this.diagnosis = props.diagnosis;
    this.visitDate = props.visitDate;
    this.visitHour = props.visitHour;
    this.patientId = props.patientId;
  }

  static fromMap(map: any ): PatientVisitEntity {
    return new PatientVisitEntity({
      visitId: map.visitId,
      reason: map.reason,
      physicalExamination: map.physicalExamination,
      weight: map.weight,
      weightPercentile: map.weightPercentile,
      height: map.height,
      heightPercentile: map.heightPercentile,
      headCircumference: map.headCircumference,
      headCircumferencePercentile: map.headCircumferencePercentile,
      bmi: map.bmi,
      bmiPercentile: map.bmiPercentile,
      bmiZScore: map.bmiZScore,
      weightZScore: map.weightZScore,
      heightZScore: map.heightZScore,
      headCircumferenceZScore: map.headCircumferenceZScore,
      diagnosis: map.diagnosis,
      visitDate: map.visitDate,
      visitHour: map.visitHour,
      patientId: map.patientId,
    });
  }

  toMap():  any {
    return {
      reason: this.reason,
      physicalExamination: this.physicalExamination,
      weight: this.weight,
      weightPercentile: this.weightPercentile,
      height: this.height,
      heightPercentile: this.heightPercentile,
      headCircumference: this.headCircumference,
      headCircumferencePercentile: this.headCircumferencePercentile,
      bmi: this.bmi,
      bmiPercentile: this.bmiPercentile,
      bmiZScore: this.bmiZScore,
      weightZScore: this.weightZScore,
      heightZScore: this.heightZScore,
      headCircumferenceZScore: this.headCircumferenceZScore,
      diagnosis: this.diagnosis,
      visitDate: this.visitDate,
      visitHour: this.visitHour,
      patientId: this.patientId,
    };
  }
}