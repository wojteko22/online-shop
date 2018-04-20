import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SelectCategoryService {

  private id = new BehaviorSubject<number>(1);
  categoryId = this.id.asObservable();

  constructor() { }

  selectCategory(id: number){
    this.id.next(id);
  }
}
