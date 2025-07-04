import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PatientVisitEntity } from '../domain/patient-visit-entity';
import { VisitActions } from '../data/state/visit.actions';
import { selectAllVisits, selectLoading, selectError } from '../data/state/visit.selectors';

@Injectable({
  providedIn: 'root'
})
export class VisitFacade {
   private store = inject(Store);


  visits$ = this.store.select(selectAllVisits);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);


  loadVisits(patientId: number): void {
    this.store.dispatch(VisitActions.loadVisits({ patientId }));
  }

  addVisit(visit: PatientVisitEntity): void {
    this.store.dispatch(VisitActions.addVisit({ visit }));
  }
}
