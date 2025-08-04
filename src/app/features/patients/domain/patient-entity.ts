export interface PatientEntityProps {
  id: number;
  creationDate: string;
  name: string;
  gender: 'male' | 'female';
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
  gender?: 'male' | 'female';
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
    this.gender = props.gender;
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
      creation_date: this.creationDate,
      name: this.name,
      gender: this.gender,
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

  static fromMap(map:  any): Patient {
    return new Patient({
      id: map.id,
      creationDate: map.creationDate,
      name: map.name,
      gender: map.gender,
      dateOfBirth: map.dateOfBirth,
      phone: map.phone,
      adresse: map.adresse,
      personalMedicalHistory: map.personalMedicalHistory ?? '',
      familialMedicalHistory: map.familialMedicalHistory ?? '',
      currentMedicalCondition: map.currentMedicalCondition ?? '',
      currentMedications: map.currentMedications ?? '',
      allergies: map.allergies ?? '',
      surgeries: map.surgeries?? '',
      vaccines: map.vaccines ?? '',
    });
  }

  equals(other: Patient): boolean {
    return (
      this.id === other.id &&
      this.creationDate === other.creationDate &&
      this.name === other.name &&
      this.gender === other.gender &&
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
