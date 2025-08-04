import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { patientFeature } from './features/patients/data/state/patient.reducer';
import { PatientEffects } from './features/patients/data/state/patient.effects';
import { LabTestEffects } from './features/lab-tests/data/state/lab-test.effects';
import { labTestFeature } from './features/lab-tests/data/state/lab-test.reducer';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PatientRepository } from './features/patients/domain/patient.repository';
import { PatientService } from './features/patients/data/patient.service';
import { GetPatientsUsecase } from './features/patients/domain/patientUsecases/get-patients.usecase';
import { DeletePatientUsecase } from './features/patients/domain/patientUsecases/delete-patient.usecase';
import { UpdatePatientUsecase } from './features/patients/domain/patientUsecases/update-patient.usecase';
import { GetPatientByIdUsecase } from './features/patients/domain/patientUsecases/get-patient-by-id.usecase';
import { AddPatientUsecaseImpl } from './features/patients/data/patient.usecase/add-patient.usecase.impl';
import { DeletePatientUsecaseImpl } from './features/patients/data/patient.usecase/delete-patient.usecase.impl';
import { UpdatePatientUsecaseImpl } from './features/patients/data/patient.usecase/update-patient.usecase.impl';
import { GetPatientByIdUsecaseImpl } from './features/patients/data/patient.usecase/get-patient-by-id.usecase.impl';
import { GetPatientsUsecaseImpl } from './features/patients/data/patient.usecase/get-patients.usecase.impl';
import { AddPatientUsecase } from './features/patients/domain/patientUsecases/add-patient.usecase';
import { VisitRepository } from './features/visits/domain/visit.repository';
import { VisitService } from './features/visits/data/visit.service';
import { GetVisitsUseCase } from './features/visits/domain/visitUsecases/getVisitsUseCase';
import { GetVisitsUseCaseImpl } from './features/visits/data/visit.usecases/get-visits.usecase.impl';
import { AddVisitUseCase } from './features/visits/domain/visitUsecases/addVisitUseCase';
import { AddVisitUseCaseImpl } from './features/visits/data/visit.usecases/add-visit.usecase.impl';
import { GetWeightPercentileUseCase } from './features/visits/domain/visitUsecases/get-weight-percentile.usecase';
import { GetWeightPercentileUseCaseImpl } from './features/visits/data/visit.usecases/get-weight-percentile.usecase.impl';
import { GetHeightPercentileUseCase } from './features/visits/domain/visitUsecases/get-height-percentile.usecase';
import { GetHeightPercentileUseCaseImpl } from './features/visits/data/visit.usecases/get-height-percentile.usecase.impl';
import { GetHeadCircumferencePercentileUseCase } from './features/visits/domain/visitUsecases/get-head-circumference-percentile.usecase';
import { GetHeadCircumferencePercentileUseCaseImpl } from './features/visits/data/visit.usecases/get-head-circumference-percentile.usecase.impl';
import { GetBmiPercentileUseCase } from './features/visits/domain/visitUsecases/get-bmi-percentile.usecase';
import { GetBmiPercentileUseCaseImpl } from './features/visits/data/visit.usecases/get-bmi-percentile.usecase.impl';
import { GetWeightGrowthDataUseCase } from './features/visits/domain/visitUsecases/get-weight-growth-data.usecase';
import { GetWeightGrowthDataUseCaseImpl } from './features/visits/data/visit.usecases/get-weight-growth-data.usecase.impl';
import { GetHeightGrowthDataUseCase } from './features/visits/domain/visitUsecases/get-height-growth-data.usecase';
import { GetHeightGrowthDataUseCaseImpl } from './features/visits/data/visit.usecases/get-height-growth-data.usecase.impl';
import { GetHeadCircumferenceGrowthDataUseCase } from './features/visits/domain/visitUsecases/get-head-circumference-growth-data.usecase';
import { GetHeadCircumferenceGrowthDataUseCaseImpl } from './features/visits/data/visit.usecases/get-head-circumference-growth-data.usecase.impl';
import { GetBmiGrowthDataUseCase } from './features/visits/domain/visitUsecases/get-bmi-growth-data.usecase';
import { GetBmiGrowthDataUseCaseImpl } from './features/visits/data/visit.usecases/get-bmi-growth-data.usecase.impl';
import { LabTestRepository } from './features/lab-tests/domain/labTest.repository';
import { LabTestService } from './features/lab-tests/data/labTest.service';
import { GetLabTestsUseCase } from './features/lab-tests/domain/labTestUsecases/get-lab-tests.usecase';
import { GetLabTestsUseCaseImpl } from './features/lab-tests/data/labTest.usecases/get-lab-tests.usecase.impl';
import { AddLabTestUseCase } from './features/lab-tests/domain/labTestUsecases/add-lab-test.usecase';
import { AddLabTestUseCaseImpl } from './features/lab-tests/data/labTest.usecases/add-lab-test.usecase.impl';
import { MedicationRepository } from './features/prescriptions/domain/MedicationRepository';
import { MedicationService } from './features/prescriptions/data/medication.service';
import { GetMedicationsUseCase } from './features/prescriptions/domain/usecases/GetMedicationsUseCase';
import { GetMedicationsUseCaseImpl } from './features/prescriptions/data/usecases/get-medications.usecase.impl';
import { AddMedicationUseCase } from './features/prescriptions/domain/usecases/AddMedicationUseCase';
import { AddMedicationUseCaseImpl } from './features/prescriptions/data/usecases/add-medication.usecase.impl';
import { prescriptionFeature } from './features/prescriptions/data/state/prescription.reducer';
import { PrescriptionEffects } from './features/prescriptions/data/state/prescription.effects';
import { visitFeature } from './features/visits/data/state/visit.reducer';
import { VisitEffects } from './features/visits/data/state/visit.effects';
import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
  withFetch(),
  withInterceptors([AuthInterceptor])
),

   
    provideStore({
        [patientFeature.name]: patientFeature.reducer,
        [labTestFeature.name]: labTestFeature.reducer,
        [prescriptionFeature.name]: prescriptionFeature.reducer,
        [visitFeature.name]: visitFeature.reducer
    }),
    provideEffects(PatientEffects, LabTestEffects, PrescriptionEffects, VisitEffects),
    { provide: PatientRepository, useClass: PatientService },
    { provide: GetPatientsUsecase, useClass: GetPatientsUsecaseImpl },
    { provide: AddPatientUsecase, useClass: AddPatientUsecaseImpl },
    { provide: DeletePatientUsecase, useClass: DeletePatientUsecaseImpl },
    { provide: UpdatePatientUsecase, useClass: UpdatePatientUsecaseImpl },
    { provide: GetPatientByIdUsecase, useClass: GetPatientByIdUsecaseImpl },
    { provide: VisitRepository, useClass: VisitService },
    { provide: GetVisitsUseCase, useClass: GetVisitsUseCaseImpl },
    { provide: AddVisitUseCase, useClass: AddVisitUseCaseImpl },
    { provide: GetWeightPercentileUseCase, useClass: GetWeightPercentileUseCaseImpl },
    { provide: GetHeightPercentileUseCase, useClass: GetHeightPercentileUseCaseImpl },
    { provide: GetHeadCircumferencePercentileUseCase, useClass: GetHeadCircumferencePercentileUseCaseImpl },
    { provide: GetBmiPercentileUseCase, useClass: GetBmiPercentileUseCaseImpl },
    { provide: GetWeightGrowthDataUseCase, useClass: GetWeightGrowthDataUseCaseImpl },
    { provide: GetHeightGrowthDataUseCase, useClass: GetHeightGrowthDataUseCaseImpl },
    { provide: GetHeadCircumferenceGrowthDataUseCase, useClass: GetHeadCircumferenceGrowthDataUseCaseImpl },
    { provide: GetBmiGrowthDataUseCase, useClass: GetBmiGrowthDataUseCaseImpl },
    { provide: LabTestRepository, useClass: LabTestService },
    { provide: GetLabTestsUseCase, useClass: GetLabTestsUseCaseImpl },
    { provide: AddLabTestUseCase, useClass: AddLabTestUseCaseImpl },
    { provide: MedicationRepository, useClass: MedicationService },
    { provide: GetMedicationsUseCase, useClass: GetMedicationsUseCaseImpl },
    { provide: AddMedicationUseCase, useClass: AddMedicationUseCaseImpl },
  ],
};
