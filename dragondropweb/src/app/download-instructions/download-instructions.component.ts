import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-download-instructions',
  templateUrl: './download-instructions.component.html',
  styleUrls: ['./download-instructions.component.css']
})
export class DownloadInstructionsComponent implements OnInit {
  public windows = true;
  public mac = false;
  public linux = false;


  constructor() {
  }

  ngOnInit() {
  }

  displayInfo(platform) {
    switch (platform) {
      case 'windows':
        this.windows = true;
        this.mac = false;
        this.linux = false;
        break;
      case 'linux':
        this.linux = true;
        this.mac = false;
        this.windows = false;
        break;
      case 'mac':
        this.mac = true;
        this.windows = false;
        this.linux = false;
        break;
    }

  }

}
