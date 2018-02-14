import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  displayedColumns = ['version', 'channel', 'changenotes', 'platforms'];
  dataSource = RELEASE_DATA;
  constructor() { }

  ngOnInit() {
  }

}

export interface ReleaseData {
  version: string;
  channel: string;
  changeNotes: string;
  platforms: string[];
}

const RELEASE_DATA: ReleaseData[] = [
  {version: '1.0.0', channel: 'stable', changeNotes: 'First Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '1.0.0-beta1', channel: 'beta', changeNotes: 'First Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '2.0.0', channel: 'stable', changeNotes: 'Second Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '3.0.0', channel: 'stable', changeNotes: 'Third Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '4.0.0', channel: 'stable', changeNotes: 'Fourth Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '5.0.0', channel: 'stable', changeNotes: 'Fifth Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '6.0.0', channel: 'stable', changeNotes: 'Sixth Release!', platforms: ['Win x64', 'macOS', 'Linux x64']},
  {version: '7.0.0', channel: 'stable', changeNotes: 'Seventh Release!', platforms: ['Win x64', 'macOS', 'Linux x64']}
];
