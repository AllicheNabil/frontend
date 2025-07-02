// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';


import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './auth/login_page/login-page.component';
import { PatientsPageComponent } from './features/patients/components/patients-page/patients-page.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    App,
   LoginPageComponent,
   PatientsPageComponent,
    BrowserModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
