import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faChevronRight, faUser, faCog } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-clinician-home',
  templateUrl: './clinician-home.component.html',
  styleUrls: ['./clinician-home.component.css']
})
export class ClinicianHomeComponent implements OnInit {

  faChevronRight = faChevronRight;
  faUser = faUser;
  faCog = faCog;
  pendingPatients : number;
  virtualWardPatients : number;
  userDetails : any ={};

  constructor(private mainService : MainService , private router :Router) { }

  ngOnInit() {
    
    this.userDetails = this.mainService.getLoggedInUser()
    console.log(this.userDetails);

    this.pendingPatients = this.mainService.getAllPatients().filter(patient => patient.category ==="Pending").length;

    this.virtualWardPatients = this.mainService.getAllPatients().filter(patient => patient.category ===  "Virtual Ward" ).length;
  }
  routeToViewScreenings(param: number){
   
    this.router.navigate(["/screenings"] , { queryParams: { id: param}})
  }
}
