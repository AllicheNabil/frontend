import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTestController } from './lab-test.controller';
import { AddLabTestComponent } from '../addLabTest/add-lab-test.component';

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
  providers: [LabTestController],
})
export class LabTestComponent implements OnInit {
  private controller = inject(LabTestController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  showAddLabTestForm = signal<boolean>(false);

  labTests = this.controller.labTests;
   @Input() patientId!: number;
  

  ngOnInit(): void {
      this.controller.loadLabTests(this.patientId);
  
  }

  

  toggleAddLabTestForm(show: boolean): void {
     this.showAddLabTestForm.set(show);
    
  }

    onLabTestAdded(): void {
    this.toggleAddLabTestForm(false);
    this.controller.loadLabTests(this.patientId);

  }
}
