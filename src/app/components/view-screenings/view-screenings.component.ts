import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MainService } from "../../services/main.service";
import { Patient } from "../../interfaces/patient";

@Component({
  selector: "app-view-screenings",
  templateUrl: "./view-screenings.component.html",
  styleUrls: ["./view-screenings.component.css"],
})
export class ViewScreeningsComponent implements OnInit {
  tabIndexHighlight: number;
  patients: Patient[];

  healthDivisionFactor: number = 100 / 28;

  patientCategories = {
    Healthy: [],
    "Virtual Ward": [],
    ICU: [],
    Pending: [],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private changeDetectionRef : ChangeDetectorRef
  ) {
    console.log("ViewScreenings constructor");
    this.route.queryParams.subscribe((params) => {
      console.log("ViewScreenings constructor -> inside queryParams");
      this.tabIndexHighlight = params["id"];
    });
    console.log("ViewScreenings constructor end");
  }

  ngOnInit() {
    console.log("Vie Screenings -> ngOnInit")
    this.mainService.getPatients().subscribe((data) => {
      console.log("View Screenings inside ngOnInit's service call start")
      this.patients = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Patient),
        } as Patient;

        // this.classifyPatients(this.patients);
      });
      this.classifyPatients(this.patients);
      console.log("View Screenings inside ngOnInit's service call end")
    });
    console.log("Vie Screenings -> ngOnInit end")
  }

  classifyPatients(patients: Patient[]) {
    console.log("Vie Screenings -> classifyPatients Function start")
    this.patients = patients.map((p) => {
     
      if (p.surveyData) {
        let keys = Object.keys(p.surveyData);

        let category = keys.reduce(
          (category, key) => {
            if (p.surveyData[key] == true) {
              category.count++;
            }
            return category;
          },
          { count: 0, label: "" }
        );

        p.healthPercent = this.healthDivisionFactor * category.count;
      } else {
        p.healthPercent = 0;
      }
      this.patientCategories[p.category || "Pending"].push(p);
      return p;
    });
    console.log("Patient categories are : " , this.patientCategories);
    this.changeDetectionRef.detectChanges();
    console.log("Vie Screenings -> classifyPatients Function end")
  }

  selectPatient(patient) {
    this.mainService.setSelectedPatient(patient);
  }

  routeToProfile() {
    this.router.navigate(["/my-profile"], {
      queryParams: { path: "view-screenings" },
    });
    // routerLink="/my-profile"
  }
}

//    // this.patientCategories["Healthy"].push(p);
// } else if (category.count < 8) {

//   // category.label = "Pending";
//   p.healthPercent = this.healthDivisionFactor * category.count;
//   // this.patientCategories["Pending"].push(p);
// } else if (category.count < 12) {
//   // category.label = "Ward";
//   p.healthPercent = this.healthDivisionFactor * category.count;
//   // this.patientCategories["Ward"].push(p);
// } else {
//   // category.label = "ICU";
//   p.healthPercent = this.healthDivisionFactor * category.count;
//   // this.patientCategories["ICU"].push(p);
// }
