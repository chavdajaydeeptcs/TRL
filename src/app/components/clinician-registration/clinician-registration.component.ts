import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { MainService } from "src/app/services/main.service";
import { Clinician } from "src/app/interfaces/clinician";

@Component({
  selector: "app-clinician-registration",
  templateUrl: "./clinician-registration.component.html",
  styleUrls: ["./clinician-registration.component.css"],
})
export class ClinicianRegistrationComponent implements OnInit {
  clinicians: Clinician[];
  insertForm: FormGroup;
  showModal :boolean = false;
 

  states: any = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  typeofClinicians: any=[
  "Nurse",
  "Nurse Practitioner",
  "Physician",
  "EMT",
  "EMT-P",
  "PA",
  "NP",
  "MD/DO",
  "LPN",
  "RN",
  "CNA",
  "CRNA",
  "RT",
  "RX"
];

  

  temp: any=[
    {
      id:'1',
      name:'ER',
      checked:false
    }, 
    {
      id:'2',
      name:'ICU',
      checked:false
    },
    {
      id:'3',
      name:'OR',
      checked:false
    },
    {
      id:'4',
      name:'ACUTE CARE',
      checked:false
    },
    {
      id:'5',
      name:'PEDIATRICS',
      checked:false
    }];
  // tempState = "California";
  @Output() modalOpen :EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.insertForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      clinicianLocation: ["", Validators.required],
      registrationNo: ["", Validators.required],
      zipCode: ["", Validators.required],
      mobileNumber: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      emailId: ["", Validators.required],
      password: ["", Validators.required],
      userType: ["clinician"],
      dob: ["", Validators.required],
      sex: ["", Validators.required],
      serviceType: ["", Validators.required],
      criticalCare: this.formBuilder.array([], [Validators.required]),
      specialization: ["", Validators.required]
    });
  }

  get formControls() {
    return this.insertForm.controls;
  }

  onSubmit() {
    this.mainService.createClinician(this.insertForm.value).then((data) => {
      if (this.insertForm.invalid) {
        return;
      }
      else{
        // this.showModal = true;
        this.modalOpen.emit();
      }
    });
    this.sendClinicianDataToSharePoint(this.insertForm.value);
  }

  sendClinicianDataToSharePoint(clinicianDetails: Clinician) {
    let clinicianObj = this.formClinicianObject(clinicianDetails);
    // let requestHeaders: HttpHeaders = new HttpHeaders();

    // requestHeaders.set("content-type", "application/json");
    // requestHeaders.set("client_id", "ZUfVUZuKhaNoOq2wxtO9NkDEGCsa");
    // requestHeaders.set("client_secret", "UeUtzpx4rKTptJ85SRdMBK2wWr0b");

    let requestHeaders = {
      "content-type": "application/json",
      client_id: "ZUfVUZuKhaNoOq2wxtO9NkDEGCsa",
      client_secret: "UeUtzpx4rKTptJ85SRdMBK2wWr0b",
    };

    const clinicianSharePointUrl ="https://mscha.mtec.mural-gehc.com/api/1.0.0/mtec/clinician";

    this.http
      .post(clinicianSharePointUrl, clinicianObj, { headers: requestHeaders })
      .subscribe((response) => {
        console.log(response);
      });
  }

  formClinicianObject(clinicianDetails: Clinician) {
    return {
      givenName: clinicianDetails.firstName,
      familyName: clinicianDetails.lastName,
      gender: clinicianDetails.sex,
      mobileNumber: clinicianDetails.mobileNumber,
      email: clinicianDetails.emailId,
      dateOfBirth: clinicianDetails.dob,
      registrationNumber: clinicianDetails.registrationNo,
      ssn: "123-45-6789",
      address: {
        location: clinicianDetails.clinicianLocation,
        city: clinicianDetails.city,
        state: clinicianDetails.state,
        zipCode: clinicianDetails.zipCode,
      },
      specialization: clinicianDetails.specialization,
      serviceType: clinicianDetails.serviceType,
      ccExperiences : clinicianDetails.criticalCare
    };
  }

 

  Checked(e) { 
    const criticalCare: FormArray = this.insertForm.get('criticalCare') as FormArray; 
     
    if (e.target.checked) { 
    criticalCare.push(new FormControl(e.target.value)); 
    } else { 
    const index = criticalCare.controls.findIndex(x => x.value === e.target.value); 
    criticalCare.removeAt(index); 
    } 
    }


}
