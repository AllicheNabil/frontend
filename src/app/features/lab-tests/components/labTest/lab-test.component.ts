import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTestFacade } from '@app/features/lab-tests/facade/lab-test.facade';
import { AddLabTestComponent } from '../addLabTest/add-lab-test.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lab-test',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    AddLabTestComponent
  ],
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.css'],
  })
export class LabTestComponent implements OnInit {
  private labTestFacade = inject(LabTestFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  showAddLabTestForm = signal<boolean>(false);

  labTests = toSignal(this.labTestFacade.labTests$, { initialValue: [] });
   @Input() patientId: number | undefined;
  

  ngOnInit(): void {
    if (this.patientId) {
      this.labTestFacade.loadLabTests(this.patientId);
    }
  }

  

  toggleAddLabTestForm(show: boolean): void {
     this.showAddLabTestForm.set(show);
    
  }

    onLabTestAdded(): void {
    this.toggleAddLabTestForm(false);
    if (this.patientId) {
      this.labTestFacade.loadLabTests(this.patientId);
    }

  }
}
