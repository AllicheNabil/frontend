import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';

@Component({
  selector: 'app-visit-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css'],
})
export class VisitDetailsComponent {
  @Input() visit!: PatientVisitEntity;
  @Output() backToList = new EventEmitter<void>();

  onBackClick(): void {
    this.backToList.emit();
  }
}
