import { Injectable, inject } from '@angular/core';
import { PrintDocumentUsecase } from '../../../core/domain/usecases/print-document.usecase';
import { Store } from '@ngrx/store';
import { Medication } from '../domain/MedicationEntity';
import { PrescriptionActions } from '../data/state/prescription.actions';
import * as PrescriptionSelectors from '../data/state/prescription.selectors';
import { PatientFacade } from '../../patients/facade/patient.facade';
import { PrescriptionHtmlGenerator } from '../generators/prescription-html-generator.service';
import { UserService } from '@app/features/user/user.service';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { User } from '@app/features/user/user.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionFacade {
  private store = inject(Store);
  private printDocumentUsecase = inject(PrintDocumentUsecase);
  private patientFacade = inject(PatientFacade);
  private prescriptionHtmlGenerator = inject(PrescriptionHtmlGenerator);
  private userService = inject(UserService);

  prescriptions$ = this.store.select(PrescriptionSelectors.selectAllSortedByDate);
  loading$ = this.store.select(PrescriptionSelectors.selectLoading);
  error$ = this.store.select(PrescriptionSelectors.selectError);

  loadPrescriptions(patientId: number): void {
    this.store.dispatch(PrescriptionActions.loadPrescriptions({ patientId }));
  }

  addPrescription(prescription: Medication): void {
    this.store.dispatch(PrescriptionActions.addPrescription({ prescription }));
  }

  printPrescription(prescriptions: Medication[], patient: Patient, userId: number): void {
    if (prescriptions.length > 0 && patient && userId) {
      forkJoin({
        user: this.userService.getProfile(),
        // patient: this.patientFacade.patient$ // Already have patient object
      }).subscribe(({ user }) => {
        const prescriptionHtml = this.prescriptionHtmlGenerator.generate(prescriptions, patient, user);
        const title = `Ordonnance pour ${patient.name}`;
        this.printDocumentUsecase.execute(prescriptionHtml, title);
      });
    }
  }
}
