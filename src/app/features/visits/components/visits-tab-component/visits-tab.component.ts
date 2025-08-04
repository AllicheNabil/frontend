import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddVisitFormComponent } from '../add-visit-form-component/add-visit-form.component';
import { VisitDetailsComponent } from '../visit-details-component/visit-details.component';
import { PatientVisitEntity } from '../../domain/patient-visit-entity';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { VisitFacade } from '@app/features/visits/facade/visit.facade';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { GrowthChartComponent } from '../growth-chart/growth-chart.component';
import { PatientFacade } from '@app/features/patients/facade/patient.facade';
import { Patient } from '@app/features/patients/domain/patient-entity';

import { calculateAgeInMonths } from '@app/core/utils/age.utils';

@Component({
  selector: 'app-visits-tab',
  standalone: true,
  imports: [CommonModule, MatButtonModule, AddVisitFormComponent, VisitDetailsComponent, MatCardModule, MatIconModule, GrowthChartComponent],
  templateUrl: './visits-tab.component.html',
  styleUrls: ['./visits-tab.component.css'],
})
export class VisitsTabComponent implements OnInit {
  @Input() patientId: number | undefined;
  private visitFacade = inject(VisitFacade);
  private patientFacade = inject(PatientFacade);

  patient: Patient | null = null;
  visits$: Observable<PatientVisitEntity[]> = this.visitFacade.visits$.pipe(startWith([]));
  showAddVisitForm: boolean = false;
  selectedVisit: PatientVisitEntity | null = null;
  showGrowthChart = false;
  currentAgeInMonths: number | null = null;

  ngOnInit(): void {
    if (this.patientId) {
      this.visitFacade.loadVisits(this.patientId);
      this.patientFacade.loadPatient(this.patientId);
      this.patientFacade.patient$.subscribe(patient => {
        if (patient && patient.id === this.patientId) {
          this.patient = patient;
          this.currentAgeInMonths = calculateAgeInMonths(new Date(patient.dateOfBirth));
          console.log(
            'Patient:',
            patient,
            'Age in months:',
            this.currentAgeInMonths
          );
        }
      });
    }
  }

  toggleGrowthChart(): void {
    this.showGrowthChart = !this.showGrowthChart;
    console.log('Toggling growth chart. showGrowthChart:', this.showGrowthChart, 'Patient:', this.patient,'age in months:', this.currentAgeInMonths);
  
  }

  addVisit(): void {
    this.showAddVisitForm = true;
  }

  onVisitAdded(): void {
    console.log('Visit added for patient:', this.patientId);
    this.showAddVisitForm = false;
    if (this.patientId) {
      this.visitFacade.loadVisits(this.patientId);
    }
  }

  onCancelAddVisit(): void {
    this.showAddVisitForm = false;
  }

  viewVisitDetails(visit: PatientVisitEntity): void {
    this.selectedVisit = visit;
  }

  backToVisitList(): void {
    this.selectedVisit = null;
  }
}
