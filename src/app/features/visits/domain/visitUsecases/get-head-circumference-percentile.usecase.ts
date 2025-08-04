import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class GetHeadCircumferencePercentileUseCase {
    abstract execute(params: { gender: 'male' | 'female', ageInMonths: number, headCircumference: number }): Observable<any>;
}
