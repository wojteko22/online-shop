import {Component, OnInit} from '@angular/core';
import {Category} from './Category';
import {CategoriesService} from "./categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit() {
    this.getCategories()
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }
}
