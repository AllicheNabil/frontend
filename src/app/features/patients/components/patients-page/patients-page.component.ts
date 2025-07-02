import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DeletePatientUsecase } from '@app/features/patients/domain/patientUsecases/delete-patient.usecase';
import { PatientsPageController } from './patients-page-controller';

@Component({
  selector: 'app-patients-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.css'],
  providers: [PatientsPageController],
})
export class PatientsPageComponent {
  private controller = inject(PatientsPageController);
  private deletePatientUsecase = inject(DeletePatientUsecase);

  searchControl = new FormControl('');

  searchQuery = this.controller.searchQuery;
  filteredPatients = this.controller.filteredPatients;

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.controller.setSearchQuery(value || '');
    });
  }

  onDeletePatient(patientId: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.deletePatientUsecase.execute(patientId.toString()).subscribe({
        next: () => {
          console.log('Patient deleted successfully');
          this.controller.loadPatients(); // Re-fetch patients to update the list
        },
        error: (error) => {
          console.error('Error deleting patient:', error);
        },
      });
    }
  }
}