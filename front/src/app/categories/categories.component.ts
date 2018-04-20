import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from './Category';
import {CategoriesService} from './categories.service';
import {ITreeOptions, TreeComponent} from 'angular-tree-component';
import {CategoryDto} from './CategoryDto';
import {Observable} from 'rxjs/Observable';
import {SnackBarService} from "../snack-bar.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;
  @ViewChild(TreeComponent)
  private treeComponent: TreeComponent;


  options: ITreeOptions = {
    idField: 'id',
    displayField: 'name',
    childrenField: 'subcategories',
    allowDrag: true,
    allowDrop: true
  };

  constructor(private categoryService: CategoriesService, private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.categoryService.getCategories();
  }
  onMoveNode($event) {
    console.log(
      'Moved', $event.node.name,
      'to', $event.to.parent.name,
      'at index', $event.to.index
    );
    this.categoryService.editCategory($event.node.id, $event.to.parent.id, $event.node.name).subscribe();
  }

  editName(id: number, parentId: number, newName: string): void {
    console.log(`id: ${id},  parentId: ${parentId}, newName: ${newName}`);
    this.categoryService.editCategory(id, parentId, newName).subscribe(
      () => this.snackBar.show('Zapisano nową nazwę'),
      error => this.snackBar.show(error)
    );
  }

  add(parentId?: number) {
    let categoryDto = new CategoryDto('Nowa kategoria', parseInt(this.categoryService.shopId), parentId);
    this.categoryService.addCategory(categoryDto).subscribe(() => this.getCategories());
  }

  delete(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => this.getCategories());
  }
}
