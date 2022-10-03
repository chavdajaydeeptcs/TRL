import { surveyQuestion } from './../../interfaces/surveyQuestion';
import { MainService } from 'src/app/services/main.service';

import { Component, OnInit } from '@angular/core';
import { faChevronRight, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  faChevronRight = faChevronRight;
  faUser = faUser;
  faCog = faCog;
  patientName : string ;
  loggedInPatient : Patient;

  allowTriageQuestionsRouting :boolean = true;
  displaySuccessPopOver : boolean = false;

  constructor(private mainService : MainService ,
              private router :Router) { }

  ngOnInit() {
    this.loggedInPatient = this.mainService.getLoggedInUser();
    this.patientName = this.mainService.getLoggedInUser()?.firstName;
    this.allowTriageQuestionsRouting  = this.loggedInPatient.surveyData ? false : true;
    this.mainService.getHideShowScreeingPopOver().subscribe(boolVal=>this.displaySuccessPopOver = boolVal);

  }

  routeToProfile(){
    // this.router.navigate(["/my-profile"],{ queryParams: { path : "home"}});
    // routerLink="/my-profile"
  }


  routeToScreeing(){
    if(this.allowTriageQuestionsRouting){
      this.router.navigate(["/patient-screening"]);
    }
  }
  closeModal(){
    this.mainService.setHideShowScreeingPopOver(false);
  }
}
