import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Shop } from './Shop';

@Injectable()
export class ShopsService {

  shopsUrl = 'http://localhost:8080/shops'; // todo: Wyciągnąć do environment

  constructor(
    private http: HttpClient) {
  }

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl);
  }
}
