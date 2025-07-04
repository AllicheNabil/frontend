export interface PatientEntityProps {
  id: number;
  creationDate: string;
  name: string;
  sex: string;
  dateOfBirth: string;
  phone: string;
  adresse: string;
  personalMedicalHistory?: string | null;
  familialMedicalHistory?: string | null;
  currentMedicalCondition?: string | null;
  currentMedications?: string | null;
  allergies?: string | null;
  surgeries?: string | null;
  vaccines?: string | null;
}

export class Patient {
  id: number;
  creationDate: string;
  name: string;
  sex: string;
  dateOfBirth: string;
  phone: string;
  adresse: string;
  personalMedicalHistory?: string | null;
  familialMedicalHistory?: string | null;
  currentMedicalCondition?: string | null;
  currentMedications?: string | null;
  allergies?: string | null;
  surgeries?: string | null;
  vaccines?: string | null;

  constructor(props: PatientEntityProps) {
    this.id = props.id;
    this.creationDate = props.creationDate;
    this.name = props.name;
    this.sex = props.sex;
    this.dateOfBirth = props.dateOfBirth;
    this.phone = props.phone;
    this.adresse = props.adresse;
    this.personalMedicalHistory = props.personalMedicalHistory ?? '';
    this.familialMedicalHistory = props.familialMedicalHistory ?? '';
    this.currentMedicalCondition = props.currentMedicalCondition ?? '';
    this.currentMedications = props.currentMedications ?? '';
    this.allergies = props.allergies ?? '';
    this.surgeries = props.surgeries ?? '';
    this.vaccines = props.vaccines ?? '';
  }

 public toMap(): Record<string, any> {
    return {
      id: this.id,
      creation_date: this.creationDate,
      name: this.name,
      sex: this.sex,
      date_of_birth: this.dateOfBirth,
      phone: this.phone,
      adresse: this.adresse,
      personal_medical_history: this.personalMedicalHistory,
      familial_medical_history: this.familialMedicalHistory,
      current_medical_conditions: this.currentMedicalCondition,
      current_medications: this.currentMedications,
      allergies: this.allergies,
      surgeries: this.surgeries,
      vaccines: this.vaccines,
    };
  }

  static fromMap(map: Record<string, any>): Patient {
    return new Patient({
      id: map['id'],
      creationDate: map['creation_date'],
      name: map['name'],
      sex: map['sex'],
      dateOfBirth: map['date_of_birth'],
      phone: map['phone'],
      adresse: map['adresse'],
      personalMedicalHistory: map['personal_medical_history'] ?? '',
      familialMedicalHistory: map['familial_medical_history'] ?? '',
      currentMedicalCondition: map['current_medical_conditions'] ?? '',
      currentMedications: map['current_medications'] ?? '',
      allergies: map['allergies'] ?? '',
      surgeries: map['surgeries'] ?? '',
      vaccines: map['vaccines'] ?? '',
    });
  }

  equals(other: Patient): boolean {
    return (
      this.id === other.id &&
      this.creationDate === other.creationDate &&
      this.name === other.name &&
      this.sex === other.sex &&
      this.dateOfBirth === other.dateOfBirth &&
      this.phone === other.phone &&
      this.adresse === other.adresse &&
      this.personalMedicalHistory === other.personalMedicalHistory &&
      this.familialMedicalHistory === other.familialMedicalHistory &&
      this.currentMedicalCondition === other.currentMedicalCondition &&
      this.currentMedications === other.currentMedications &&
      this.allergies === other.allergies &&
      this.surgeries === other.surgeries &&
      this.vaccines === other.vaccines
    );
  }
}
