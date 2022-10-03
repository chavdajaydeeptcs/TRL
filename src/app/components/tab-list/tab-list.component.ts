import { Router } from '@angular/router';
import { ScreeningTabComponent } from "../screening-tab/screening-tab.component";
import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  ContentChild,
  ElementRef,
  Input,
} from "@angular/core";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "tab-list",
  templateUrl: "./tab-list.component.html",
  styleUrls: ["./tab-list.component.css"],
})
export class TabListComponent implements OnInit {
  @ContentChildren(ScreeningTabComponent) tabs: QueryList<ScreeningTabComponent>;

  @ContentChildren(ScreeningTabComponent, { read: ElementRef })
  elTabs: QueryList<ElementRef>;
  @Input() selectedTabIndex: number;

  faArrowLeft = faArrowLeft;
  constructor(private router : Router) {}

  ngOnInit() {}

  ngAfterContentInit() {}

  selectTab(tab: ScreeningTabComponent) {
    this.tabs.forEach((singleTab, index) => {
      singleTab.isActive = false;
      if (singleTab == tab) {
        this.selectedTabIndex = index;
      }
    });

    tab.isActive = true;
  }

  navigateBack(){
   this.router.navigate(["/clinician-home"]);
  }
}
