import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  constructor(config: NgbCarouselConfig){
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }
}
