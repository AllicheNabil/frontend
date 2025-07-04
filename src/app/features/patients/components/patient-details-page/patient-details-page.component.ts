import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PatientFacade } from '@app/features/patients/facade/patient.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs/operators';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VisitsTabComponent } from '@app/features/visits/components/visits-tab-component/visits-tab.component';
import { LabTestComponent } from '@app/features/lab-tests/components/labTest/lab-test.component';
import { PrescriptionsTabComponent } from '@app/features/prescriptions/components/prescriptions-tab/prescriptions-tab.component';


@Component({
  selector: 'app-patient-details-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    VisitsTabComponent,
    RouterModule,
    LabTestComponent,
    PrescriptionsTabComponent,
],
  providers: [
    
  ],
  templateUrl: './patient-details-page.component.html',
  styleUrls: ['./patient-details-page.component.css'],
})
export class PatientDetailsPageComponent {
  private route = inject(ActivatedRoute);
  private patientFacade = inject(PatientFacade);

  patient = toSignal(
  this.route.queryParams.pipe(
    filter(params => !!params['patientId']),
    switchMap(params => {
      const patientId = Number(params['patientId']);
      return this.patientFacade.patients$.pipe(
        map(patients => patients.find(p => p.id === patientId)),
        filter((patient): patient is Patient => !!patient)
      );
    })
  ),
);


  editMode: boolean = false;


  medicalHistoryForm = new FormGroup({
    personalMedicalHistory: new FormControl(''),
    familialMedicalHistory: new FormControl(''),
    currentMedicalCondition: new FormControl(''),
    currentMedications: new FormControl(''),
    allergies: new FormControl(''),
    surgeries: new FormControl(''),
    vaccines: new FormControl(''),
  });

  constructor() {
    effect(() => {
      const patient = this.patient(); // on appelle le signal
      if (patient) {
        this.medicalHistoryForm.patchValue({
          personalMedicalHistory: patient.personalMedicalHistory,
          familialMedicalHistory: patient.familialMedicalHistory,
          currentMedicalCondition: patient.currentMedicalCondition,
          currentMedications: patient.currentMedications,
          allergies: patient.allergies,
          surgeries: patient.surgeries,
          vaccines: patient.vaccines,
        });
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode && this.patient()) {
      // If exiting edit mode, reset form to current patient data
      this.medicalHistoryForm.patchValue({
        personalMedicalHistory: this.patient()?.personalMedicalHistory,
        familialMedicalHistory: this.patient()?.familialMedicalHistory,
        currentMedicalCondition: this.patient()?.currentMedicalCondition,
        currentMedications: this.patient()?.currentMedications,
        allergies: this.patient()?.allergies,
        surgeries: this.patient()?.surgeries,
        vaccines: this.patient()?.vaccines,
      });
    }
  }

  saveMedicalHistory() {
    if (this.patient() && this.medicalHistoryForm.valid) {
      const updatedPatient: Patient = new Patient({
        ...this.patient()!,
        ...this.medicalHistoryForm.value,
      });

      this.patientFacade.updatePatient(updatedPatient);
      this.toggleEditMode(); // Exit edit mode
      console.log('Medical history updated successfully!');
    }
  }
}
