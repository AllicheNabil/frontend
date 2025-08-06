import { PrescriptionViewComponent } from './features/prescriptions/components/prescription-view/prescription-view';
import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page.component'; // Updated import
import { LoginPageComponent } from './auth/login_page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { PatientsPageComponent } from './features/patients/components/patients-page/patients-page.component';
import { authGuard } from './auth/auth.guard';
import { UserComponent } from './features/user/user';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // Set HomePageComponent as default
  { path: 'patients', component: PatientsPageComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'add-patient',
    loadComponent: () =>
      import(
        './features/patients/components/add-patient-page/add-patient-page.component'
      ).then((m) => m.AddPatientPageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'patients/details',
    loadComponent: () =>
      import(
        './features/patients/components/patient-details-page/patient-details-page.component'
      ).then((m) => m.PatientDetailsPageComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'visits',
        loadComponent: () =>
          import(
            './features/visits/components/visits-tab-component/visits-tab.component'
          ).then((m) => m.VisitsTabComponent),
      },
      {
        path: 'lab-tests',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/lab-tests/components/labTest/lab-test.component'
              ).then((m) => m.LabTestComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import(
                './features/lab-tests/components/addLabTest/add-lab-test.component'
              ).then((m) => m.AddLabTestComponent),
          },
        ],
      },
    ],
  },
  { path: 'print-prescription/:id', component: PrescriptionViewComponent },
  { path: 'profile', component: UserComponent, canActivate: [authGuard] },
];