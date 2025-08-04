import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class GetWeightGrowthDataUseCase {
    abstract execute(gender: 'male' | 'female'): Observable<any[]>;
}
