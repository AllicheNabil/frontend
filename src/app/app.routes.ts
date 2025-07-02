import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './auth/login_page/login-page.component';
import { PatientsPageComponent } from './features/patients/components/patients-page/patients-page.component';
export const routes: Routes = [
 
   { path: '', component: HomeComponent  },
   { path: 'patients', component: PatientsPageComponent },
   { path: 'login', component: LoginPageComponent },
   { path: 'add-patient', loadComponent: () => import('./features/patients/components/add-patient-page/add-patient-page.component').then(m => m.AddPatientPageComponent) },
   { path: 'patients/details', 
     loadComponent: () => import('./features/patients/components/patient-details-page/patient-details-page.component').then(m => m.PatientDetailsPageComponent),
     
    
     children: [
      { path: 'visits', loadComponent: () => import('./features/visits/components/visits-tab-component/visits-tab.component').then(m => m.VisitsTabComponent) },
      { path: 'lab-tests',
        children: [
          { path: '', loadComponent: () => import('./features/lab-tests/components/labTest/lab-test.component').then(m => m.LabTestComponent) },
          { path: 'add', loadComponent: () => import('./features/lab-tests/components/addLabTest/add-lab-test.component').then(m => m.AddLabTestComponent) }
        ]
      }
     ] ,
     
   }
];

