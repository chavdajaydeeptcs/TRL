import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'patient-to-call',
  templateUrl: './patient-to-call.component.html',
  styleUrls: ['./patient-to-call.component.css']
})
export class PatientToCallComponent implements OnInit {
  @Input() patientName : string;
  @Input() patientDate : string;
  @Input() healthPercent : number | string;
  faPhone = faPhone;
  
  constructor() { }

  ngOnInit() {
    this.healthPercent = Math.floor(Number(this.healthPercent));
    
  }

  getColor(healthScore){
   
    if(healthScore < 40)
      return 'green';
   
    else if(healthScore < 70)
      return  'orange';
    else
      return 'red';

    // else if(healthScore < 8)
    //   return 'o';
  }


}
