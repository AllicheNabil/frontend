import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitRepository {

  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getWeightPercentile(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/percentile/weight`, { params });
  }
}
