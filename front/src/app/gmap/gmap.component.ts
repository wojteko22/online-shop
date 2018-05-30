import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Shop} from '../shops/shop';
import {Marker} from '../-models/marker';
import {GmapService} from './gmap.service';
import {ShopsService} from '../shops/shops.service';
import {Location} from '../-models/location';
import {Order} from "../orders/order";

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit, OnChanges {

  centerLat: number = 51.111503;
  centerLng: number = 17.060207;

  @Input() shops: Shop[];
  markers: Marker[] = [];


  constructor(private gmapService: GmapService) {

  }

  ngOnInit() {
    // this.findUser();
  }

  ngOnChanges() {
    if (this.shops != undefined) {
      this.mapShopsToMarkers();
    }

      let userLocation = new Marker(this.centerLat, this.centerLng, "You are here");
      this.gmapService.getPath(userLocation, this.shops).subscribe((res) => console.log(res))

  }

  mapShopsToMarkers() {
    for (const shop of this.shops) {
      this.gmapService.getGeoLocation(shop.city + ' ' + shop.street).subscribe((res: Location) => {
          const loc = res.results[0].geometry.location;
          this.markers.push(new Marker(loc.lat, loc.lng, shop.name));
        }
      );
      this.markers.push();
    }
  }

  findUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.centerLat = position.coords.latitude;
        this.centerLng = position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
