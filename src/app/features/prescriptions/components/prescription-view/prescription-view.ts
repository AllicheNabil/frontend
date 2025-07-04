import { Patient } from '@app/features/patients/domain/patient-entity';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { calculateAge } from '@app/core/utils/age.utils';

@Component({
  selector: 'app-prescription-view',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './prescription-view.html',
  styleUrls: ['./prescription-view.css']
})
export class PrescriptionViewComponent implements OnInit {
  patient: Patient | undefined;
  prescriptionDate: Date = new Date();
  medications: any[] = [];
  age : number | undefined  = 0 ;
  
  @Input() patientId!: number;


  ngOnInit(): void {
    console.log('patient name', this.patient?.name);
    const prescriptionData = sessionStorage.getItem('prescriptionData');
    if (prescriptionData) {
      this.age = this.patientAge ;
      const data = JSON.parse(prescriptionData);
      this.patient = data.patient;
      this.prescriptionDate = data.prescriptionDate;
      this.medications = data.medications;
      // Use a timeout to ensure the view is rendered before printing
      setTimeout(() => window.print(), 500);
    }

    
  }

  get patientAge(): number | undefined {
    if (this.patient?.dateOfBirth) {
      return calculateAge(new Date(this.patient.dateOfBirth));
    }
    return undefined;
  }
}