import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: PatientRepository, useClass: PatientService },
    { provide: GetPatientsUsecase, useClass: GetPatientsUsecaseImpl },
    { provide: AddPatientUsecase, useClass: AddPatientUsecaseImpl },
    { provide: DeletePatientUsecase, useClass: DeletePatientUsecaseImpl },
    { provide: UpdatePatientUsecase, useClass: UpdatePatientUsecaseImpl },
    { provide: GetPatientByIdUsecase, useClass: GetPatientByIdUsecaseImpl },
    { provide: VisitRepository, useClass: VisitService },
    { provide: GetVisitsUseCase, useClass: GetVisitsUseCaseImpl },
    { provide: AddVisitUseCase, useClass: AddVisitUseCaseImpl },
    { provide: LabTestRepository, useClass: LabTestService },
    { provide: GetLabTestsUseCase, useClass: GetLabTestsUseCaseImpl },
    { provide: AddLabTestUseCase, useClass: AddLabTestUseCaseImpl },
    { provide: MedicationRepository, useClass: MedicationService },
    { provide: GetMedicationsUseCase, useClass: GetMedicationsUseCaseImpl },
    { provide: AddMedicationUseCase, useClass: AddMedicationUseCaseImpl },
  ],
};
