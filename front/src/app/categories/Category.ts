import {CategorySimpleDto} from '../-models/CategorySimpleDto';

export class Category {
  id: number;
  name: string;
  parentCategory: number;
  subcategories: Category[];

  constructor(id: number, name: string, parentCategory: number, subcategories: Category[]) {
    this.id = id;
    this.name = name;
    this.parentCategory = parentCategory;
    this.subcategories = subcategories;
  }
}

