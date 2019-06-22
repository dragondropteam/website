import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-download-instructions',
  templateUrl: './download-instructions.component.html',
  styleUrls: ['./download-instructions.component.css']
})
export class DownloadInstructionsComponent implements OnInit {
  platform = 'windows';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.platform)
      .subscribe(params => {
        this.platform = params.platform;
      });
  }

  getSelectedPlatform() {
    switch (this.platform) {
      case 'windows':
        return 0;
      case 'mac':
        return 1;
      case 'linux':
        return 2;
      default:
        return 0;
    }
  }
}
