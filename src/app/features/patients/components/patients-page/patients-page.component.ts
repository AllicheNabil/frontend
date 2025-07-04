import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PatientFacade } from '@app/features/patients/facade/patient.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, startWith, map } from 'rxjs';

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
})
export class PatientsPageComponent implements OnInit {
  private patientFacade = inject(PatientFacade);

  searchControl = new FormControl('');

  patients = toSignal(this.patientFacade.patients$, { initialValue: [] });
  loading = toSignal(this.patientFacade.loading$, { initialValue: false });
  error = toSignal(this.patientFacade.error$, { initialValue: null });

  filteredPatients = toSignal(
    combineLatest([
      this.patientFacade.patients$,
      this.searchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([patients, searchTerm]) =>
        patients.filter(patient =>
          patient.name.toLowerCase().includes((searchTerm || '').toLowerCase())
        )
      )
    ),
    { initialValue: [] }
  );

  ngOnInit(): void {
    this.patientFacade.loadPatients();
  }

  onDeletePatient(patientId: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientFacade.deletePatient(patientId);
    }
  }
}