import { Component, OnInit } from '@angular/core';
import {ReleaseService} from '../release.service';
import {Release} from '../release/release.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  release: Release;

  ngOnInit() {
  }
}
