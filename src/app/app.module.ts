
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AvailableCliniciansComponent } from './components/available-clinicians/available-clinicians.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { ClinicianHomeComponent } from './components/clinician-home/clinician-home.component';

import { PatientToCallComponent } from './components/patient-to-call/patient-to-call.component';
import { TabListComponent } from './components/tab-list/tab-list.component';

import {ViewScreeningsComponent} from './components/view-screenings/view-screenings.component'
import { ScreeningTabComponent } from './components/screening-tab/screening-tab.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { LoginComponent } from './components/login/login.component';
import { ScreeningComponent } from './components/screening/screening.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './components/screening/question/question.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ClinicianRegistrationComponent } from './components/clinician-registration/clinician-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {HttpClientModule, HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AvailableCliniciansComponent,
    PatientHomeComponent,
    ClinicianHomeComponent,
    
    PatientToCallComponent,
    TabListComponent,
    ViewScreeningsComponent,
    ScreeningTabComponent,
    PatientDetailsComponent,
    LoginComponent,
    ScreeningComponent,
    QuestionComponent,
    ClinicianRegistrationComponent,
    PatientRegistrationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    HttpClientModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
