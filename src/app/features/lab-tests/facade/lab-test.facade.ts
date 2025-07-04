import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LabTestEntity } from '../domain/lab-test.entity';
import { LabTestActions } from '../data/state/lab-test.actions';
import { selectAllLabTests, selectLoading, selectError } from '../data/state/lab-test.selectors';

@Injectable({
  providedIn: 'root'
})
export class LabTestFacade {

  private store = inject(Store);
  labTests$ = this.store.select(selectAllLabTests);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);


  loadLabTests(patientId: number): void {
    this.store.dispatch(LabTestActions.loadLabTests({ patientId }));
  }

  addLabTest(labTest: LabTestEntity): void {
    this.store.dispatch(LabTestActions.addLabTest({ labTest }));
  }
}
