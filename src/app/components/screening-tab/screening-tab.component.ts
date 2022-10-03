import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'screening-tab',
  templateUrl: './screening-tab.component.html',
  styleUrls: ['./screening-tab.component.css']
})
export class ScreeningTabComponent implements OnInit {

  @Input() tabName : string;
  @Input() isActive : boolean;
  

  constructor() { }

  ngOnInit() {
  }

}
