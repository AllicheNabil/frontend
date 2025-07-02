import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LabTestEntity } from '../domain/lab-test.entity';
import { LabTestRepository } from '@app/features/lab-tests/domain/labTest.repository';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class LabTestService extends LabTestRepository {
  private http = inject(HttpClient);
      private baseUrl = environment.apiUrl;
  

  getLabTests(patientId: number): Observable<LabTestEntity[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${patientId}/labtests`).pipe(
      map((data) => data.map((item) => LabTestEntity.fromMap(item)))
    );
  }

  addLabTest(labTest: LabTestEntity): Observable<LabTestEntity> {
    console.log('Adding lab test:', labTest.patientId); 
    return this.http.post<any>(`${this.baseUrl}/${labTest.patientId}/labtests`, labTest.toMap()).pipe(
      map((data) => LabTestEntity.fromMap(data))
    );
  }
}
