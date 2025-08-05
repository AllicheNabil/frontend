import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { formatAge } from '@app/core/utils/age.utils';
import { CertificatBonneSanteComponent } from '@app/features/certificates/certificat-bonne-sante/certificat-bonne-sante.component';
import { CertificatMedicalComponent } from '@app/features/certificates/certificat-medical/certificat-medical.component';
import { LabTestComponent } from '@app/features/lab-tests/components/labTest/lab-test.component';
import { PrescriptionsTabComponent } from '@app/features/prescriptions/components/prescriptions-tab/prescriptions-tab.component';
import { ReferralLetterComponent } from '@app/features/referral-letter/components/referral-letter-component/referral-letter.component';
import { VisitsTabComponent } from '@app/features/visits/components/visits-tab-component/visits-tab.component';
import { Patient } from '../../domain/patient-entity';
import { PatientFacade } from '../../facade/patient.facade';



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
    MatCardModule,
    MatIconModule,
    VisitsTabComponent,
    RouterModule,
    LabTestComponent,
    PrescriptionsTabComponent,
    CertificatMedicalComponent,
    CertificatBonneSanteComponent,
    ReferralLetterComponent,
    HttpClientModule
],
  providers: [
    
  ],
  templateUrl: './patient-details-page.component.html',
  styleUrls: ['./patient-details-page.component.css'],

})
export class PatientDetailsPageComponent {
  private route = inject(ActivatedRoute);
  private patientFacade = inject(PatientFacade);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

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

  formattedAge: string = '';

  editMode: boolean = false;
  isEditingPersonalInfo = false;


  medicalHistoryForm = new FormGroup({
    personalMedicalHistory: new FormControl(''),
    familialMedicalHistory: new FormControl(''),
    currentMedicalCondition: new FormControl(''),
    currentMedications: new FormControl(''),
    allergies: new FormControl(''),
    surgeries: new FormControl(''),
    vaccines: new FormControl(''),
  });

  personalInfoForm = new FormGroup({
    name: new FormControl(''),
    adresse: new FormControl(''),
    phone: new FormControl(''),
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
        this.formattedAge = formatAge(new Date(patient.dateOfBirth));
      }
    });

    this.matIconRegistry.addSvgIcon(
      'patient_id_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/patientId.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'medical_history_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/medicalHistory.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'visit_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/visit.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'lab_tests_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/labtests.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'prescription_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/prescription.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'certificat_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/certificat.svg')
    );
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
        gender: this.patient()!.gender!,
      });

      this.patientFacade.updatePatient(updatedPatient);
      this.toggleEditMode(); // Exit edit mode
      console.log('Medical history updated successfully!');
    }
  }

  togglePersonalInfoEditMode(): void {
    this.isEditingPersonalInfo = !this.isEditingPersonalInfo;
    if (this.isEditingPersonalInfo) {
      const patient = this.patient();
      if (patient) {
        this.personalInfoForm.patchValue({
          name: patient.name,
          adresse: patient.adresse,
          phone: patient.phone,
        });
      }
    } 
  }

  savePersonalInfo(): void {
    if (this.patient() && this.personalInfoForm.valid) {
      const formValues = this.personalInfoForm.value;
      const updatedPatient: Patient = new Patient({
        ...this.patient()!,
        name: formValues.name ?? '',
        adresse: formValues.adresse ?? '',
        phone: formValues.phone ?? '',
        gender: this.patient()!.gender!,
      });
      this.patientFacade.updatePatient(updatedPatient);
      this.togglePersonalInfoEditMode();
    }
  }
}
