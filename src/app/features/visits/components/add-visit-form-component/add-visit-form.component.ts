import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { VisitFacade } from '@app/features/visits/facade/visit.facade';
import { AuthService } from '@app/auth/auth.service';
import { PatientFacade } from '@app/features/patients/facade/patient.facade';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { calculateAgeInMonths } from '@app/core/utils/age.utils'; // Import the utility function
import { GrowthChartComponent } from '../growth-chart/growth-chart.component';

@Component({
  selector: 'app-add-visit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    GrowthChartComponent
  ],
  templateUrl: './add-visit-form.component.html',
  styleUrls: ['./add-visit-form.component.css'],
})
export class AddVisitFormComponent {
  @Input() patientId: number | undefined;
  @Output() onVisitAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private visitFacade = inject(VisitFacade);
  private authService = inject(AuthService);
  private patientFacade = inject(PatientFacade);

  patient: Patient | null = null;
  showHeadCircumferenceFields: boolean = false;
  showBmiFields: boolean = false;
  showGrowthChart: boolean = false;
  currentAgeInMonths: number | null = null;
  currentWeight: number | null = null;
  currentHeight: number | null = null;
  currentHeadCircumference: number | null = null;
  currentBmi: number | null = null;
  currentVisits: PatientVisitEntity[] = [];

  get chartGender(): 'male' | 'female' {
    if (!this.patient) {
      return 'male'; // Default value
    }
    return this.patient.gender!;
  }

  visitForm = new FormGroup({
    reason: new FormControl('', Validators.required),
    physicalExamination: new FormControl(''),
    weight: new FormControl(''),
    weightPercentile: new FormControl<string | null>(''),
    weightZScore: new FormControl<string | null>(''),
    height: new FormControl(''),
    heightPercentile: new FormControl<string | null>(''),
    heightZScore: new FormControl<string | null>(''),
    headCircumference: new FormControl(''),
    headCircumferencePercentile: new FormControl<string | null>(''),
    headCircumferenceZScore: new FormControl<string | null>(''),
    bmi: new FormControl(''),
    bmiPercentile: new FormControl<string | null>(''),
    bmiZScore: new FormControl<string | null>(''),
    diagnosis: new FormControl('', Validators.required),
    visitDate: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
    visitHour: new FormControl(new Date().toTimeString().split(' ')[0].substring(0, 5), Validators.required),
  });

  

  ngOnInit() {
    if (this.patientId) {
      this.patientFacade.patient$.subscribe(patient => {
        if (patient && patient.id === this.patientId) {
          this.patient = patient;
          const ageInMonths = calculateAgeInMonths(new Date(this.patient.dateOfBirth));
          this.currentAgeInMonths = ageInMonths;
          this.showHeadCircumferenceFields = ageInMonths <= 36;
          this.showBmiFields = ageInMonths >= 24;
        }
      });
      this.patientFacade.loadPatient(this.patientId);
      this.visitFacade.loadVisits(this.patientId);
      this.visitFacade.visits$.subscribe(visits => {
        this.currentVisits = [...visits];
      });
      console.log("Visits:", this.currentVisits);
    }


    this.visitForm.get('weight')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(weight => {
        if (this.patient && weight) {
          this.currentWeight = weight ? parseFloat(weight) : null; 
          const ageInMonths = calculateAgeInMonths(new Date(this.patient.dateOfBirth)); // Use the utility function
          const gender = this.patient.gender;
          return this.visitFacade
            .getWeightPercentile(gender!, ageInMonths, parseFloat(weight))
            .pipe(
              catchError((error) => {
                
                console.error('Error calculating weight percentile:', error);
                this.visitForm.get('weightPercentile')?.setValue(''); // Clear the field on error
                return of({ percentile: null, zScore: null }); // Return an observable with null percentile and zScore
              })
            );
        }
        return of({ percentile: null, zScore: null });
      })
    ).subscribe((response: { percentile: number | null, zScore: number | null }) => {
      console.log('Response:', response);
      this.visitForm.get('weightPercentile')?.setValue(response.percentile !== null ? `${(response.percentile).toFixed(2)}%` : '');
      this.visitForm.get('weightZScore')?.setValue(response.zScore !== null ? response.zScore.toFixed(2) : '');
    });

    this.visitForm.get('height')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(height => {
        if (this.patient && height) {
          const ageInMonths = calculateAgeInMonths(new Date(this.patient.dateOfBirth));
          console.log('Age in months:', ageInMonths);
          const gender = this.patient.gender;
          return this.visitFacade
            .getHeightPercentile(gender!, ageInMonths, parseFloat(height))
            .pipe(
              catchError((error) => {
                console.error('Error calculating height percentile:', error);
                this.visitForm.get('heightPercentile')?.setValue('');
                return of({ percentile: null, zScore: null });
              })
            );
        }
        return of({ percentile: null, zScore: null });
      })
    ).subscribe((response: { percentile: number | null, zScore: number | null }) => {
      console.log('Response:', response);
      
      this.visitForm.get('heightPercentile')?.setValue(response.percentile !== null ? `${(response.percentile).toFixed(2)}%` : '');
      this.visitForm.get('heightZScore')?.setValue(response.zScore !== null ? response.zScore.toFixed(2) : '');
    });

    // Calculate head circumference zscore and percentile
    this.visitForm.get('headCircumference')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(headCircumference => {
        if (this.patient && headCircumference) {
          const ageInMonths = calculateAgeInMonths(new Date(this.patient.dateOfBirth));
          const gender = this.patient.gender;
          return this.visitFacade
            .getHeadCircumferencePercentile(gender!, ageInMonths, parseFloat(headCircumference))
            .pipe(
              catchError((error) => {
                console.error('Error calculating headCircumference percentile:', error);
                this.visitForm.get('headCircumference')?.setValue('');
                return of({ percentile: null, zScore: null });
              })
            );
        }
        return of({ percentile: null, zScore: null });
      })
    ).subscribe((response: { percentile: number | null, zScore: number | null }) => {
      console.log('Response:', response);
      
      this.visitForm
        .get('headCircumferencePercentile')
        ?.setValue(
          response.percentile !== null
            ? `${response.percentile.toFixed(2)}%`
            : ''
        );
      this.visitForm
        .get('headCircumferenceZScore')
        ?.setValue(response.zScore !== null ? response.zScore.toFixed(2) : '');
    });

    // Calculate BMI when weight or height changes
    this.visitForm.get('weight')?.valueChanges.subscribe(() => this.calculateBmi());
    this.visitForm.get('height')?.valueChanges.subscribe(() => this.calculateBmi());

    this.visitForm.get('bmi')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(bmi => {
        if (this.patient && bmi) {
          console.log('BMI:', bmi); 
          const ageInMonths = calculateAgeInMonths(new Date(this.patient.dateOfBirth));
          console.log('Age in months:', ageInMonths);
          const gender = this.patient.gender;
          return this.visitFacade
            .getBmiPercentile(gender!, ageInMonths, parseFloat(bmi))
            .pipe(
              catchError((error) => {
                console.error('Error calculating bmi percentile:', error);
                this.visitForm.get('bmiPercentile')?.setValue('');
                return of({ percentile: null, zScore: null });
              })
            );
        }
        return of({ percentile: null, zScore: null });
      })
    ).subscribe((response: { percentile: number | null, zScore: number | null }) => {
      console.log('Response:', response);
      
      this.visitForm.get('bmiPercentile')?.setValue(response.percentile !== null ? `${(response.percentile).toFixed(2)}%` : '');
      this.visitForm.get('bmiZScore')?.setValue(response.zScore !== null ? response.zScore.toFixed(2) : '');
    });

    this.visitForm.get('weight')?.valueChanges.subscribe(val => {
      console.log('Weight valueChanges - raw:', val, 'parsed:', val !== null ? parseFloat(val) : null);
      this.currentWeight = val ? parseFloat(val) : null;
    });
    this.visitForm.get('height')?.valueChanges.subscribe(val => {
      console.log('Height valueChanges - raw:', val, 'parsed:', val !== null ? parseFloat(val) : null);
      this.currentHeight = val ? parseFloat(val) : null;
    });
    this.visitForm.get('headCircumference')?.valueChanges.subscribe(val => {
      console.log('Head Circumference valueChanges - raw:', val, 'parsed:', val !== null ? parseFloat(val) : null);
      this.currentHeadCircumference = val ? parseFloat(val) : null;
    });
    this.visitForm.get('bmi')?.valueChanges.subscribe(val => {
      console.log('BMI valueChanges - raw:', val, 'parsed:', val !== null ? parseFloat(val) : null);
      this.currentBmi = val ? parseFloat(val) : null;
    });
  }

  calculateBmi() {
    const weight = parseFloat(this.visitForm.get('weight')?.value || '');
    const height = parseFloat(this.visitForm.get('height')?.value || '');

    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100; // Convert cm to meters
      const bmi = weight / (heightInMeters * heightInMeters);
      this.visitForm.get('bmi')?.setValue(`${bmi.toFixed(2)}`);
    } else {
      this.visitForm.get('bmi')?.setValue('');
    }
  }

  onSubmit() {
    console.log('onSubmit() called.');
    console.log('Form valid:', this.visitForm.valid);
    if (this.visitForm.valid && this.patientId) {
      const formValues = this.visitForm.value;
      const userId = this.authService.currentUserId;
      if (userId) {
        const newVisit = new PatientVisitEntity({
          visitId: 0, // Will be generated by the backend
          patientId: this.patientId, // Now guaranteed to be a number
          reason: formValues.reason!,
          physicalExamination: formValues.physicalExamination || '',
          weight: formValues.weight || '',
          weightPercentile: formValues.weightPercentile || '',
          weightZScore: formValues.weightZScore || '',
          height: formValues.height || '',
          heightPercentile: formValues.heightPercentile || '',
          heightZScore: formValues.heightZScore || '',
          headCircumference: formValues.headCircumference || '',
          headCircumferencePercentile: formValues.headCircumferencePercentile || '',
          headCircumferenceZScore: formValues.headCircumferenceZScore || '',  
          bmi: formValues.bmi || '',
          bmiPercentile: formValues.bmiPercentile || '',
          bmiZScore: formValues.bmiZScore || '',
          diagnosis: formValues.diagnosis!,
          visitDate: formValues.visitDate!,
          visitHour: formValues.visitHour!,
        });

        this.visitFacade.addVisit(newVisit);
        this.visitFacade.loadVisits(this.patientId);
        this.onVisitAdded.emit();
        console.log('Visit added successfully!');
      }
    }
  }

  onPrint() {
    if (this.visitForm.valid && this.patientId) {
      const formValues = this.visitForm.value;
      const newVisit = new PatientVisitEntity({
        visitId: 0, // Not relevant for printing, but needed for entity constructor
        patientId: this.patientId,
        reason: formValues.reason!,
        physicalExamination: formValues.physicalExamination || '',
        weight: formValues.weight || '',
        height: formValues.height || '',
        headCircumference: formValues.headCircumference || '',
        bmi: formValues.bmi || '',
        bmiPercentile: formValues.bmiPercentile || '',
        bmiZScore: formValues.bmiZScore || '',
        weightZScore: formValues.weightZScore || '',
        heightZScore: formValues.heightZScore || '',
        diagnosis: formValues.diagnosis!,
        visitDate: formValues.visitDate!,
        visitHour: formValues.visitHour!,
      });
      this.visitFacade.printVisit(newVisit);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  toggleGrowthChart(): void {
    this.showGrowthChart = !this.showGrowthChart;
  }

  logValues() {
    console.log(
      'Values passed to chart:',
      this.currentWeight,
      this.currentHeight,
      this.currentHeadCircumference,
      this.currentBmi
    );
  }
}
