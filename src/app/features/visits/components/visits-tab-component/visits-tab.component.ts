import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddVisitFormComponent } from '../add-visit-form-component/add-visit-form.component';
import { VisitsTabController } from '../visits-tab.controller';
import { VisitDetailsComponent } from '../visit-details-component/visit-details.component';
import { PatientVisitEntity } from '../../domain/patient-visit-entity';

@Component({
  selector: 'app-visits-tab',
  standalone: true,
  imports: [CommonModule, MatButtonModule, AddVisitFormComponent, VisitDetailsComponent],
  templateUrl: './visits-tab.component.html',
  styleUrls: ['./visits-tab.component.css'],
  providers: [VisitsTabController] // Provide the controller at the component level
})
export class VisitsTabComponent implements OnInit {
  @Input() patientId!: number;
  private controller = inject(VisitsTabController);

  // Expose controller properties to the template
  visits = this.controller.visits;
  showAddVisitForm = this.controller.showAddVisitForm;
  selectedVisit = this.controller.selectedVisit;

  ngOnInit(): void {
    console.log('VisitsTabComponent ngOnInit - showAddVisitForm initially:', this.showAddVisitForm());
    this.controller.loadVisits(this.patientId);
  }

  addVisit(): void {
    this.controller.toggleAddVisitForm(true);
  }

  onVisitAdded(): void {
    this.controller.onVisitAdded(this.patientId);
  }

  onCancelAddVisit(): void {
    this.controller.toggleAddVisitForm(false);
  }

  viewVisitDetails(visit: PatientVisitEntity): void {
    this.controller.selectVisit(visit);
  }

  backToVisitList(): void {
    this.controller.clearSelectedVisit();
  }
}
