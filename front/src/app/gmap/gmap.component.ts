import {Component, OnInit} from '@angular/core';
import {Shop} from '../shops/shop';
import {Marker} from './marker';
import {GmapService} from './gmap.service';
import {ShopsService} from '../shops/shops.service';
import {Location} from './location';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  centerLat: number = 51.111503;
  centerLng: number = 17.060207;

  shops: Shop[];
  markers: Marker[] = [];

  constructor(private shopsService: ShopsService, private gmapService: GmapService) {

  }

  ngOnInit() {
    if (this.markers.length === 0) {
      this.getShops();
    }
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

  getShops(): void {
    this.shopsService.getShops()
      .subscribe(shops => {
        this.shops = shops;
        this.mapShopsToMarkers();
      });
  }
}
