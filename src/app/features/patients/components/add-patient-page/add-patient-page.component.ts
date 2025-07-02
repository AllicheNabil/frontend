import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientEntity } from '@app/features/patients/domain/patient-entity';
import { AddPatientUsecase } from '@app/features/patients/domain/patientUsecases/add-patient.usecase';

@Component({
  selector: 'app-add-patient-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-patient-page.component.html',
  styleUrls: ['./add-patient-page.component.css'],
})
export class AddPatientPageComponent {
  private addPatientUsecase = inject(AddPatientUsecase);
  private router = inject(Router);

  patientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.patientForm.valid) {
      const formValues = this.patientForm.value;

      const newPatient = new PatientEntity({
        id: 0, // backend generates the real ID
        creationDate: new Date().toISOString().split('T')[0], // today’s date in "YYYY-MM-DD"
        name: formValues.name!,
        sex: formValues.sex!,
        dateOfBirth: formValues.dateOfBirth!,
        phone: formValues.phone!,
        adresse: formValues.adresse!,
        personalMedicalHistory: '',
        familialMedicalHistory: '',
        currentMedicalCondition: '',
        currentMedications: '',
        allergies: '',
        surgeries: '',
        vaccines: '',
      });

      this.addPatientUsecase.execute(newPatient).subscribe({
        next: (patient) => {
          console.log('Patient added successfully:', patient);
          this.router.navigate(['/patients']);
        },
        error: (error) => {
          console.error('Error adding patient:', error);
          // Affiche une erreur à l'utilisateur si nécessaire
        },
      });
    }
  }
}
