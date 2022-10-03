import { Clinician } from 'src/app/interfaces/clinician';
import { Router , ActivatedRoute} from '@angular/router';
import { MainService } from '../../services/main.service';
import { Component, OnInit} from '@angular/core';
import { faArrowLeft , faComment } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'available-clinicians',
  templateUrl: './available-clinicians.component.html',
  styleUrls: ['./available-clinicians.component.css']
})
export class AvailableCliniciansComponent implements OnInit {

  clinicians : Clinician[];
  dummyClinicians : string[];
  faArrowLeft = faArrowLeft;
  faComment = faComment;

  constructor(private router : Router,
              private route : ActivatedRoute ,
              private mainService : MainService) { 
    this.dummyClinicians = [
      "Dave Warner" ,"Michael Smith" ,"Jeff Smith" ,"Tim John" ,
      "Liza Ann" ,"Jack J" ,"Carl Smith"]
  }

  ngOnInit() {
    // this.clinicians =  this.dummyClinicians;
    // clinician-home
    this.getAvailableClinicians();

  }

  navigateBack(){
    this.router.navigate(["../patient-home"] , {relativeTo : this.route});
  }

  getAvailableClinicians(){
    this.clinicians = this.mainService.getAllStoredClinicians();
  }


}
