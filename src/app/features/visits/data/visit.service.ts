import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitRepository } from '@app/features/visits/domain/visit.repository';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment.prod';

@Injectable({ providedIn: 'root' })
export class VisitService implements VisitRepository {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getVisits(patientId: number): Observable<PatientVisitEntity[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}/visits`).pipe(
      map(visits => {
        console.log(`Raw visits data for patient ID ${patientId}:`, visits);
        return visits.map(visit => PatientVisitEntity.fromMap(visit));
      })
    );
  }

  addVisit(visit: PatientVisitEntity): Observable<PatientVisitEntity> {
    return this.http.post<any>(`${this.apiUrl}/patient/${visit.patientId}/visits`, visit.toMap()).pipe(
      map(newVisit => PatientVisitEntity.fromMap(newVisit))
    );
  }

  getWeightPercentile(gender: 'male' | 'female', ageInMonths: number, weight: number): Observable<{ percentile: number | null, zScore: number | null }> {
    return this.http.get<{ percentile: number | null, zScore: number | null }>(`${this.apiUrl}/percentile/weight?gender=${gender}&ageInMonths=${ageInMonths}&weight=${weight}`).pipe(
      map(response => {
        console.log('API Response for getWeightPercentile:', response);
        return {
          percentile: response.percentile !== undefined ? response.percentile : null,
          zScore: response.zScore !== undefined ? response.zScore : null,
        };
      })
    );
  }

  getHeightPercentile(gender: 'male' | 'female', ageInMonths: number, height: number): Observable<{ percentile: number | null, zScore: number | null }> {
    return this.http.get<{ percentile: number | null, zScore: number | null }>(`${this.apiUrl}/percentile/height?gender=${gender}&ageInMonths=${ageInMonths}&height=${height}`).pipe(
      map(response => {
        console.log('API Response for getHeightPercentile:', response);
        return {
          percentile: response.percentile !== undefined ? response.percentile : null,
          zScore: response.zScore !== undefined ? response.zScore : null,
        };
      })
    );
  }

  getHeadCircumferencePercentile(gender: 'male' | 'female', ageInMonths: number, headCircumference: number): Observable<{ percentile: number | null, zScore: number | null }> {
    return this.http.get<{ percentile: number | null, zScore: number | null }>(`${this.apiUrl}/percentile/head-circumference?gender=${gender}&ageInMonths=${ageInMonths}&headCircumference=${headCircumference}`).pipe(
      map(response => {
        console.log('API Response for getHeadCircumferencePercentile:', response);
        return {
          percentile: response.percentile !== undefined ? response.percentile : null,
          zScore: response.zScore !== undefined ? response.zScore : null,
        };
      })
    );
  }

  getBmiPercentile(gender: 'male' | 'female', ageInMonths: number, bmi: number): Observable<{ percentile: number | null, zScore: number | null }> {
    return this.http.get<{ percentile: number | null, zScore: number | null }>(`${this.apiUrl}/percentile/bmi?gender=${gender}&ageInMonths=${ageInMonths}&bmi=${bmi}`).pipe(
      map(response => {
        console.log('API Response for getBmiPercentile:', response);
        return {
          percentile: response.percentile !== undefined ? response.percentile : null,
          zScore: response.zScore !== undefined ? response.zScore : null,
        };
      })
    );
  }

  getWeightGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/percentile/growth-data/weight?gender=${gender}`);
  }

  getHeightGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/percentile/growth-data/height?gender=${gender}`);
  }

  getHeadCircumferenceGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/percentile/growth-data/head-circumference?gender=${gender}`);
  }

  getBmiGrowthData(gender: 'male' | 'female'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/percentile/growth-data/bmi?gender=${gender}`);
  }
}