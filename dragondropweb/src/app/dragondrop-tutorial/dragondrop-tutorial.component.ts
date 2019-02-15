import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dragondrop-tutorial',
  templateUrl: './dragondrop-tutorial.component.html',
  styleUrls: ['./dragondrop-tutorial.component.css']
})
export class DragondropTutorialComponent implements OnInit {

  environment = 'dragondrop';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  getSelectedEnvironment() {
    switch (this.environment) {
      case 'dragondrop':
        return 0;
      case 'visual_phaser':
        return 1;
      case 'wink':
        return 2;
      default:
        return 0;
    }
  }
}
