import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddPrescriptionFormComponent } from '../add-prescription-form/add-prescription-form.component';
import { PrescriptionFacade } from '@app/features/prescriptions/facade/prescription.facade';
import { Observable } from 'rxjs';
import { Medication } from '@app/features/prescriptions/domain/MedicationEntity';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-prescriptions-tab',
  standalone: true,
  imports: [CommonModule, MatButtonModule, AddPrescriptionFormComponent, MatTableModule, MatIconModule],
  templateUrl: './prescriptions-tab.component.html',
  styleUrls: ['./prescriptions-tab.component.css'],
})
export class PrescriptionsTabComponent implements OnInit {
  @Input() patientId: number | undefined;
  private prescriptionFacade = inject(PrescriptionFacade);

  medications$: Observable<Medication[]> = this.prescriptionFacade.prescriptions$;
  showAddPrescriptionForm = false;

  ngOnInit(): void {
    this.loadMedications();

  }

  loadMedications(): void {
    if (this.patientId) {
      this.prescriptionFacade.loadPrescriptions(this.patientId);
    }
  }

  toggleAddPrescriptionForm(show: boolean): void {
    console.log('toggleAddPrescriptionForm called with:', show);
    this.showAddPrescriptionForm = show;
  }

  onPrescriptionAdded(): void {
    console.log('onPrescriptionAdded called');
    this.toggleAddPrescriptionForm(false);
    this.loadMedications();
  }
}
