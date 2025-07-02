import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GetMedicationsUseCase } from '@app/features/prescriptions/domain/usecases/GetMedicationsUseCase';
import { MedicationEntity } from '@app/features/prescriptions/domain/MedicationEntity';
import { AddPrescriptionFormComponent } from '../add-prescription-form/add-prescription-form.component';

@Component({
  selector: 'app-prescriptions-tab',
  standalone: true,
  imports: [CommonModule, MatButtonModule, AddPrescriptionFormComponent],
  templateUrl: './prescriptions-tab.component.html',
  styleUrls: ['./prescriptions-tab.component.css'],
})
export class PrescriptionsTabComponent implements OnInit {
  @Input() patientId!: number;
  private getMedicationsUseCase = inject(GetMedicationsUseCase);

  medications: MedicationEntity[] = [];
  showAddPrescriptionForm = false;

  ngOnInit(): void {
    this.loadMedications();

  }

  loadMedications(): void {
    this.getMedicationsUseCase.execute(this.patientId).subscribe({
      next: (data) => {
        this.medications = data;
      },
      error: (error) => {
        console.error('Error fetching medications:', error);
      },
    });
  }

  toggleAddPrescriptionForm(show: boolean): void {
    this.showAddPrescriptionForm = show;
  }

  onPrescriptionAdded(): void {
    this.toggleAddPrescriptionForm(false);
    this.loadMedications();
  }
}
