import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marker} from "../-models/marker";
import {Shop} from "../shops/shop";


@Injectable()
export class GmapService {

  constructor(private http: HttpClient) {
  }

  public getGeoLocation(address: string) {
    console.log('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCKAHTz4KvsPHmiQpK-5ew5eq17VO7bOxM&address=' + address);
    return this.http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCKAHTz4KvsPHmiQpK-5ew5eq17VO7bOxM&address=' + address
    );
  }

  public getPath(origin: Marker, shops: Shop[]) {
    if (origin != undefined && shops && shops.length != 0) {
      let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${shops[0].street},${shops[0].city}`;
      if (shops.length > 1) {
        url += `&waypoints=`;
        for (let i = shops.length - 1; i > 1; i--) {
          url += `${shops[i].street},${shops[i].city}`;
          if (i != 2) {
            url += `|`;
          }
        }
      }
      url += `&key=AIzaSyCKAHTz4KvsPHmiQpK-5ew5eq17VO7bOxM`;
      console.log(url);
      return this.http.get(url);
    }
  }

}
