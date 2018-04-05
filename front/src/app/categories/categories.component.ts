import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from './Category';
import {CategoriesService} from "./categories.service";
import {ITreeOptions, TreeComponent} from "angular-tree-component";
import {UserService} from "../user/user.service";
import {CategoryDto} from "./CategoryDto";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoriesService, UserService],
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  @ViewChild(TreeComponent)
  private treeComponent: TreeComponent;


  options: ITreeOptions = {
    idField: 'id',
    displayField: 'name',
    childrenField: 'subcategories',
    allowDrag: true,
    allowDrop: true
  };

  constructor(private categoryService: CategoriesService) {

  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    setTimeout(() => {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
      }
      , 200)

  }

  onMoveNode($event) {
    console.log(
      "Moved",
      $event.node.name,
      "to",
      $event.to.parent.name,
      "at index",
      $event.to.index);
    this.categoryService.editCategory($event.node.id, $event.to.parent.id, $event.node.name)
      .subscribe(
        () => {
          `Category ${$event.node.name} updated`
        }
      );
  }

  editName(id: number, parentId: number, newName: string): void {
    console.log(`id: ${id},  parentId: ${parentId}, newName: ${newName}`)
    this.categoryService.editCategory(id, parentId, newName).subscribe();
  }

  add(parentId?: number) {
    let categoryDto = new CategoryDto("Nowa kategoria", parseInt(this.categoryService.shopId), parentId);
    this.categoryService.addCategory(categoryDto).subscribe(() => console.log("Category added"));
    this.getCategories();
    this.treeComponent.treeModel.update();
  }

  delete(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => console.log(`category ${id} deleted`));
    const node = this.treeComponent.treeModel.getNodeBy((it) => it.id == id);
    node.hide();
    this.getCategories();
    this.treeComponent.treeModel.update();
  }

}
