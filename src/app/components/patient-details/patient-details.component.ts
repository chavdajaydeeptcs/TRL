import { Clinician } from "src/app/interfaces/clinician";

import { locationDetails } from "./../../interfaces/locationDetails";
import { surveyQuestion } from "./../../interfaces/surveyQuestion";
import { MainService } from "./../../services/main.service";
import { Router, ActivatedRoute } from "@angular/router";

import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
  ChangeDetectionStrategy,
} from "@angular/core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Patient } from "src/app/interfaces/patient";
import { Subscription } from "rxjs";

@Component({
  selector: "app-patient-details",
  templateUrl: "./patient-details.component.html",
  styleUrls: ["./patient-details.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PatientDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren("tab") tabs: QueryList<ElementRef>;
  meterList;
  surveyData: any;
  patientDetails: Patient;

  // loggedInClinician: Clinician;

  id: any;
  firstName: string = "hello";
  lastName: string = "";
  patientDetailsSubscription: Subscription;
  disableSubmit: boolean = true;
  healthScore: number;
  showLocationDetails: boolean = false;
  quesArray = [];
  getPatientsSubscription: Subscription;

  patientAge: number;

  facilityDetails: locationDetails = {
    facility: "",
    unit: "",
    room: "",
    bed: "",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.meterList = Array(28).fill(1);
  }
  isTravelHistory: "Yes";
  feedback: string;
  feedbackDiscription;

  faArrowLeft = faArrowLeft;

  ngOnInit() {
    this.isTravelHistory = "Yes";
    // this.feedback = "";
    this.feedbackDiscription = "";

    this.route.queryParams.subscribe((params) => {
      let path = params["path"];

      // this.loggedInClinician = this.mainService.getLoggedInUser();


      // if (path == "home") {
      //   this.loggedInClinician = this.mainService.getloggedInClinician();

      //   this.patientAge = new Date().getFullYear() - new Date(this.patientDetails.age).getFullYear()

      //   this.feedback =
      //     this.patientDetails.category == undefined ||
      //     this.patientDetails.category === "Pending"
      //       ? ""
      //       : this.patientDetails.category;
      //   this.calculateFacilityDetails(this.feedback, this.patientDetails);
      //   this.id = this.patientDetails.id;
      //   this.healthScore = this.getHealthScore(this.patientDetails);
      //   this.surveyData = this.surveyData;
      //   console.log("Survey Daayta1", this.surveyData);
      // }
      if (path == "view-screenings") {
        this.getPatientsSubscription = this.mainService
          .getSelectedPatient()
          .subscribe((data) => {
            this.patientDetails = data;
            this.patientAge =
              new Date().getFullYear() -
              new Date(this.patientDetails.age).getFullYear();
            console.log("Patient details : ", this.firstName);
            this.feedback =
              this.patientDetails.category == undefined || this.patientDetails.category == "Pending" ? "" : this.patientDetails.category;
            
              this.calculateFacilityDetails(this.feedback, this.patientDetails);

            this.healthScore = this.getHealthScore(this.patientDetails);
            this.surveyData = this.patientDetails.surveyData;
            this.quesArray = Object.keys(this.surveyData);
          });
      }
    });
  }

  calculateFacilityDetails(feedback, patientDetails: Patient) {
    if (feedback === "ICU") {
      this.showLocationDetails = true;
      this.disableSubmit = true;
      this.facilityDetails = patientDetails.location || this.facilityDetails;
    }
  }

  getHealthScore(patientDetails): number {
    if (patientDetails.surveyData) {
      let sum2 = Object.keys(this.patientDetails.surveyData).reduce(
        (sum, key) => {
          console.log(sum);
          if (this.patientDetails.surveyData[key] === true) sum = sum + 1;
          return sum;
        },
        0
      );
      console.log("Sum 2 : ", sum2);
      return sum2;
    } else return 0;
  }

  submitSurvey() {
    console.log("Submit survey called");
    console.log(this.isTravelHistory);
    console.log(this.feedback);
    console.log(this.feedbackDiscription);

    if (this.feedback !== "ICU") {
      if (this.patientDetails.location)
        this.mainService.updatePatientByMobileNumber(
          this.patientDetails.mobileNumber,
          { category: this.feedback, location: null }
        );
      else {
        this.mainService.updatePatientByMobileNumber(
          this.patientDetails.mobileNumber,
          { category: this.feedback }
        );
      }
    } else {
      this.mainService.updatePatientByMobileNumber(
        this.patientDetails.mobileNumber,
        { category: this.feedback, location: this.facilityDetails }
      );

      // let requestObject = this.formRequestObject(this.patientDetails,this.loggedInClinician);
    }

    let calculateRouteParam;
    let categoryMap = {
      Pending: 0,
      "Virtual Ward": 1,
      ICU: 2,
      Healthy: 3,
    };
    calculateRouteParam = categoryMap[this.feedback];
    // this.router.navigate(["/screenings"] , {queryParams : {id : calculateRouteParam}});
    this.router.navigate(["/clinician-home"]);
  }

  // formRequestObject(patientDetails: Patient, clinicianDetails: Clinician): any {
  //   let requestObj = {};

  //   let patientDetailsObj = {
  //     givenName: patientDetails.firstName,
  //     familyName: patientDetails.lastName,
  //     gender: patientDetails.sex,
  //     mobileNumber: patientDetails.mobileNumber,
  //     email: patientDetails.emailId,
  //     // CHANGE TO DATE OF BIRTH
  //     dateOfBirth: patientDetails.age,
  //     ssn: "123-45-6789",
  //     address: {
  //       street1: "9900 West",
  //       street2: "innovation Drive",
  //       city: patientDetails.city,
  //       state: patientDetails.state,
  //       zipCode: patientDetails.zipCode,
  //     },
  //     bedLocation: {
  //       facility: patientDetails.location.facility,
  //       unit: patientDetails.location.unit,
  //       room: patientDetails.location.room,
  //       bed: patientDetails.location.bed,
  //     },
  //   };

  //   let admittingDoctorDetailsObj = {
  //     id: clinicianDetails.id,
  //     givenName: clinicianDetails.firstName,
  //     familyName: clinicianDetails.lastName,
  //     registrationNumber: clinicianDetails.registrationNo,
  //     email: clinicianDetails.emailId,
  //     mobileNumber: clinicianDetails.mobileNumber,
  //     address: {
  //       street1: "9900 West",
  //       street2: "innovation Drive",
  //       city: clinicianDetails.city,
  //       state: clinicianDetails.state,
  //       zipCode: clinicianDetails.zipCode,
  //     },
  //   };

  //   // let attendingDoctorDetailsObj = JSON.parse(JSON.stringify(admittingDoctorDetailsObj));

  //   let mainRequestObject = {
  //     ...patientDetailsObj,
  //     admittingDoctor: { ...admittingDoctorDetailsObj },
  //     attendingDoctor: { ...admittingDoctorDetailsObj },
  //   };
  //   return mainRequestObject;
  // }

  changeTravelHistory(e) {
    this.isTravelHistory = e.target.value;
  }
  changeFeedback(e) {
    this.feedback = e.target.value;
    console.log("type : ", this.feedback);
    if (this.feedback === "ICU") {
      this.showLocationDetails = true;
    } else {
      this.showLocationDetails = false;
    }
    this.disableSubmit = false;
  }
  navigateBack() {
    this.router.navigate(["/screenings"], {
      queryParams: { id: 0 },
      relativeTo: this.route,
    });
  }

  selectTab(event) {
    this.tabs.forEach((tab) => {
      tab.nativeElement.classList.remove("active-tab");
    });
    event.target.classList.add("active-tab");
  }

  getAllPatients() {}

  ngOnDestroy() {
    // this.patientDetailsSubscription.unsubscribe();
    this.getPatientsSubscription.unsubscribe();
  }
}
