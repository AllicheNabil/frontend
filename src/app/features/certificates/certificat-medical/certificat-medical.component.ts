import { Component, Input, inject, OnInit } from '@angular/core';
import { CertificateFacade } from '../facade/certificate.facade';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Patient } from '../../patients/domain/patient-entity';

@Component({
  selector: 'app-certificat-medical',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './certificat-medical.component.html',
  styleUrls: ['./certificat-medical.component.css']
})
export class CertificatMedicalComponent implements OnInit {
  @Input() patient!: Patient;
  private certificateFacade = inject(CertificateFacade);
  sickLeaveDays = new FormControl<number | null>(null);
  parentName = new FormControl<string | null>({ value: null, disabled: true });
  parentNameEnabled = new FormControl<boolean>(false);

  ngOnInit(): void {
    this.parentNameEnabled.valueChanges.subscribe(enabled => {
      if (enabled) {
        this.parentName.enable();
      } else {
        this.parentName.disable();
        this.parentName.reset();
      }
    });
  }

  print(): void {
    this.certificateFacade.printCertificate('aptitude au travail', this.patient, this.sickLeaveDays.value || undefined, this.parentName.value || undefined);
  }
}