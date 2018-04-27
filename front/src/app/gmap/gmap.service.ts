import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class GmapService {

  constructor(private http: HttpClient) {
  }

  public getGeoLocation(address: string) {
    return this.http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCKAHTz4KvsPHmiQpK-5ew5eq17VO7bOxM&address=' + address
    );
  }

}
