import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class GetHeadCircumferenceGrowthDataUseCase {
    abstract execute(gender: 'male' | 'female'): Observable<any[]>;
}
