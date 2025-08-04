import { Observable } from 'rxjs';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';

export abstract class VisitRepository {
  abstract getVisits(patientId: number): Observable<PatientVisitEntity[]>;
  abstract addVisit(visit: PatientVisitEntity): Observable<PatientVisitEntity>;
  abstract getWeightPercentile(gender: 'male' | 'female', ageInMonths: number, weight: number): Observable<{ percentile: number | null, zScore: number | null }>;
  abstract getHeightPercentile(gender: 'male' | 'female', ageInMonths: number, height: number): Observable<{ percentile: number | null, zScore: number | null }>;
  abstract getHeadCircumferencePercentile(gender: 'male' | 'female', ageInMonths: number, headCircumference: number): Observable<{ percentile: number | null, zScore: number | null }>;
  abstract getBmiPercentile(gender: 'male' | 'female', ageInMonths: number, bmi: number): Observable<{ percentile: number | null, zScore: number | null }>;
  abstract getWeightGrowthData(gender: 'male' | 'female'): Observable<any[]>;
  abstract getHeightGrowthData(gender: 'male' | 'female'): Observable<any[]>;
  abstract getHeadCircumferenceGrowthData(gender: 'male' | 'female'): Observable<any[]>;
  abstract getBmiGrowthData(gender: 'male' | 'female'): Observable<any[]>;
}