import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  centerLat: number = 51.678418;
  centerLng: number = 7.809007;

  ngOnInit(){

  }
}
