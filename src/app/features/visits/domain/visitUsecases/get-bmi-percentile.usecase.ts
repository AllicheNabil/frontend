import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class GetBmiPercentileUseCase {
    abstract execute(params: { gender: 'male' | 'female', ageInMonths: number, bmi: number }): Observable<any>;
}
