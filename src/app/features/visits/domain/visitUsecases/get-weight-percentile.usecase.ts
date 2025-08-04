import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class GetWeightPercentileUseCase {
    abstract execute(params: { gender: 'male' | 'female', ageInMonths: number, weight: number }): Observable<any>;
}
