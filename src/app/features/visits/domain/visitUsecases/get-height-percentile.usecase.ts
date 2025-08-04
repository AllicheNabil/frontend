import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class GetHeightPercentileUseCase {
    abstract execute(params: { gender: 'male' | 'female', ageInMonths: number, height: number }): Observable<any>;
}
