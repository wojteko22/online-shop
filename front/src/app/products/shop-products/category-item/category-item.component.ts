import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from '../../../categories/categories.service';
import {CategorySimpleDto} from '../../../-models/CategorySimpleDto';
import {SelectCategoryService} from '../select-category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {

  @Input() space: string = "";
  @Input() category: CategorySimpleDto;
  visible: boolean = false;
  loaded: boolean = false;
  subcategories: CategorySimpleDto[];

  constructor(private categoriesService: CategoriesService,
              private selectCategory: SelectCategoryService) {
  }

  ngOnInit() {
  }

  toggle() {
    this.selectCategory.selectCategory(this.category.categoryId);
    if (!this.loaded) {
      this.loadSubcategories();
    }
    this.visible = !this.visible;
  }

  loadSubcategories() {
    this.categoriesService.getSubcategories(this.category.categoryId).subscribe((categories) => {
      this.subcategories = categories;
      this.loaded=true;
    });
  }

}
