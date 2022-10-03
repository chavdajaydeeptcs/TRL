import { Patient } from "src/app/interfaces/patient";

import { Router } from "@angular/router";
import { surveyQuestion } from "./../../interfaces/surveyQuestion";
import { QuestionComponent } from "./question/question.component";

import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MainService } from "src/app/services/main.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-screening",
  templateUrl: "./screening.component.html",
  styleUrls: ["./screening.component.css"],
})
export class ScreeningComponent implements OnInit {
  dataQA = {};
  tabId: number = 1;
  isShow: boolean = true;
  isShow1: boolean = true;
  isShow2: boolean = true;
  isShow3: boolean = true;
  showSurvey: boolean = false;
  showModal: boolean = false;
  showQue: boolean = false;
  @ViewChild("modal") modalControl: ElementRef;
  @ViewChildren("tab") elTabs: QueryList<ElementRef>;
  disableQue: boolean = false;

  loggedInPatient: Patient;

  showQues: boolean[] = [false , false , false ,false];

  constructor(
    private router: Router,
    private mainService: MainService,
    private http: HttpClient
  ) {}

  tabParentQuestions :string[] = [
    "During the past 14 days: Have you been in close contact with a person diagnosed with COVID-19?",
    "During the past 14 days: Have you been outside the United States or contacted many people or worked/presented at a health facility?",
    "Have you experienced any of the following symptoms during the past 14 days (Choose all that apply)",
    "Do you have any of the following disease or risk factors?(Choose all that apply)"
  ]


  questionsForTab1: string[] = [
    "I share the same house with a person infected with the virus or is a member of my family",
    "You have been in the same closed space for more than 20 minutes with an infected person (Such as house, joint residential unit, work place, class room, vehicle or plane)",
    "You have been face-to-face  with a person infected with the virus for more than 20 minutes , less than 5 feet away from each other",
    "I have medical history like Diabetes , Heart problems ,  blood pressure1You have touched or been exposed to the respiratory secretions of an infected person.",
    "I am working in a health facility where I have contacted a positive case without protection ( neither he nor I were wearing masks)",
    "You have been face-to-face with a person infected with the virus, less (more) than 5 feet away from each other.",
    "You have been  in the same closed space for less than 20 minutes with an infected person (Such as house, same residential unit, work place, class room or vehicle)",
    "I am not a health practitioner and have visited a health facility (Clinic, hospital, inpatient, waiting area), in the last 14 days"
  ];

  questionsForTab2: string[] = [
    "I have been outside the United State during the past 14 days",
    "I leave my house and interact with people a lot",
    "I am not a health practitioner  and have visited a health facility (Clinic, hospital, inpatient, waiting area)",
    "I am a health practitioner or working in a health facility or providing services to patients and following required preventive measures.",
  ];

  questionsForTab3: string[] = [
    "High fever",
    "Cough (New or more than usual)",
    "Sore throat",
    " Shortness of breath (First time or more than usual)",
    "Tremors and body pain (First time)",
    "Confusion",
  ];

  questionsForTab4: string[] = [
    "Asthma",
    "Chronic lung diseases",
    "Kidney failure",
    "Heart diseases",
    "Diabetes",
    "Hypertension",
    "Cancer and tumors",
    "Immunodeficiency",
    "Taking Immunosuppressive drug",
    "Taking pain reliever or fever reducer on a daily basis",
    "My age is over 60",
    "Obesity with body mass index 40 or higher",
  ];

  loopArray: number[] = [1, 2, 3, 4, 5, 6, 7];
  ngOnInit(): void {
    this.loggedInPatient = this.mainService.getLoggedInUser();
  }

  selectTab(event, id: number) {
    this.tabId = id;
    this.isShow = false;
    if (id == 3) {
      this.isShow1 = false;
    }
    if (id == 4) {
      this.isShow2 = false;
    }

    this.elTabs.forEach((tab) =>
      tab.nativeElement.classList.remove("active-tab")
    );

    event.target.classList.add("active-tab");
  }
  addData(event) {
    this.dataQA[event.question] = event.answer;
  }
  submitData() {
    // send data to db
    this.showModal = true;
    console.log(this.showModal);
    console.log(this.dataQA);
    const qaDataObj = { surveyData: this.dataQA };
    // this.mainService.updatePatientByMobileNumber("333333" , qaDataObj);
    this.mainService.setHideShowScreeingPopOver(true);
    // this.modalControl.nativeElement.classList.remove("display-none");
    let userId = this.mainService.getLoggedInUser().mobileNumber;
    this.mainService.updatePatientByMobileNumber(userId, qaDataObj);
    this.sendPatientDataToSharePoint(this.loggedInPatient, this.dataQA);
  }

  sendPatientDataToSharePoint(patientDetails: Patient, dataQA) {
    let patientObj = this.formPatientObject(patientDetails, dataQA);
    // let requestHeaders: HttpHeaders = new HttpHeaders();

    let headers2 = {
      "content-type": "application/json",
      client_id: "ZUfVUZuKhaNoOq2wxtO9NkDEGCsa",
      client_secret: "UeUtzpx4rKTptJ85SRdMBK2wWr0b",
    };

    const pateintSharePointUrl = "https://mscha.mtec.mural-gehc.com/api/1.0.0/mtec/patient";
    //"https://muralapp.eastus.cloudapp.azure.com/api/1.0.0/mtec/patient";

    this.http
      .post(pateintSharePointUrl, patientObj, { headers: headers2 })
      .subscribe((response) => {
        console.log(response);
       });
  }

  formPatientObject(patientDetails: Patient, dataQA: any) {
    let qaDataArray = Object.keys(dataQA).map((question) => {
      return {
        id: "0",
        question: question,
        answer: dataQA[question] === true ? "Yes" : "No",
      };
    });

    let surveyScore = qaDataArray.reduce((score , qaObject) =>{
        if(qaObject.answer == "Yes")
          score = score+1;
        return score;
    },0)

    surveyScore = Math.round((surveyScore/28)*100);


    console.log("QA data array: ", qaDataArray);
    return {
      givenName: patientDetails.firstName,
      familyName: patientDetails.lastName,
      gender: patientDetails.sex,
      mobileNumber: patientDetails.mobileNumber,
      email: patientDetails.emailId,
      dateOfBirth: patientDetails.age,
      ssn: "123-45-6789",
      address: {
        location: patientDetails.patientLocation,
        city: patientDetails.city,
        state: patientDetails.state,
        zipCode: patientDetails.zipCode,
      },
      triageSurvey: [...qaDataArray],
      riskScore: surveyScore,
      emergencyContacts : [{
        name: patientDetails.fullName || "name",
        mobileNumber : patientDetails.familyMobileNumber || "number",
        relation : patientDetails.relation || "none"
      }]
    };
  }

  navigateBack() {
    // UNCOMMENT !!
    this.router.navigate(["/patient-home"]);
  }
  closeModal() {
    this.showModal = false;
  // UNCOMMENT !!
    this.router.navigate(["/patient-home"]);
  }

  ChangeVisiblity(e , tabId) {

    if (e.target.value == "Yes") {
      this.showQue = true;
      this.showQues[tabId] = true;
    } else {
      this.showQue = false;
      this.showQues[tabId] = false;
    }
  }
}
