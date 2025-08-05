import { Injectable, inject } from '@angular/core';
import { PrintDocumentUsecase } from '../../../core/domain/usecases/print-document.usecase';
import { Store } from '@ngrx/store';
import { LabTestEntity } from '../domain/lab-test.entity';
import { LabTestActions } from '../data/state/lab-test.actions';
import { selectAllSortedByDate, selectLoading, selectError } from '../data/state/lab-test.selectors';
import { LabTestHtmlGenerator } from '../generators/lab-test-html-generator.service';
import { forkJoin } from 'rxjs';
import { Patient } from '../../patients/domain/patient-entity';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LabTestFacade {

  private store = inject(Store);
  private printDocumentUsecase = inject(PrintDocumentUsecase);
  private labTestHtmlGenerator = inject(LabTestHtmlGenerator);
  private userService = inject(UserService);

  labTests$ = this.store.select(selectAllSortedByDate);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);


  loadLabTests(patientId: number): void {
    this.store.dispatch(LabTestActions.loadLabTests({ patientId }));
  }

  addLabTest(labTest: LabTestEntity): void {
    this.store.dispatch(LabTestActions.addLabTest({ labTest }));
  }

  printLabTests(labTests: string[], patient: Patient, userId: number): void {
    if (labTests.length > 0 && patient && userId) {
      forkJoin({
        user: this.userService.getProfile(),
      }).subscribe(({ user }) => {
        const labTestHtml = this.labTestHtmlGenerator.generate(labTests, patient, user);
        const title = `Bilan de laboratoire pour ${patient.name}`;
        this.printDocumentUsecase.execute(labTestHtml, title);
      });
    }
  }
}
