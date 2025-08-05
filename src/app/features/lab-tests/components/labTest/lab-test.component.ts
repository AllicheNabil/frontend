import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule  } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AddLabTestComponent } from '../addLabTest/add-lab-test.component';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LabTestFacade } from '../../facade/lab-test.facade';

@Component({
  selector: 'app-lab-test',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AddLabTestComponent,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.css'],
  })
export class LabTestComponent implements OnInit {
  private labTestFacade = inject(LabTestFacade);
  showAddLabTestForm = signal<boolean>(false);
  
  labTests = toSignal(this.labTestFacade.labTests$, { initialValue: [] });
  isLoading = toSignal(this.labTestFacade.loading$, { initialValue: false });

   @Input() patientId: number | undefined;
  

  ngOnInit(): void {
    this.loadLabTests();
  }

  loadLabTests(): void {
    if (this.patientId) {
      this.labTestFacade.loadLabTests(this.patientId);
    }
  }


  toggleAddLabTestForm(show: boolean): void {
     this.showAddLabTestForm.set(show);

  }

    onLabTestAdded(): void {
    this.toggleAddLabTestForm(false);
    this.loadLabTests();
  }
}