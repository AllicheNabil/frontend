import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Patient } from '../../domain/patient-entity';
import { PatientFacade } from '../../facade/patient.facade';

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
    MatSelectModule,
  ],
  templateUrl: './add-patient-page.component.html',
  styleUrls: ['./add-patient-page.component.css'],
})
export class AddPatientPageComponent implements OnInit {
  private patientFacade = inject(PatientFacade);
  private router = inject(Router);

  patientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl<'male' | 'female'>('male', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.patientForm.get('name')?.valueChanges.subscribe(value => {
      if (value) {
        this.patientForm.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const formValues = this.patientForm.value;

      const newPatient = new Patient({
        id: 0, // backend generates the real ID
        creationDate: new Date().toISOString().split('T')[0], // today’s date in "YYYY-MM-DD"
        name: formValues.name!,
        gender: formValues.gender!,
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

      this.patientFacade.addPatient(newPatient);
      this.router.navigate(['/patients']);
    }
  }
}
