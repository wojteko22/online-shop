export class CategorySimpleDto{
  name: string;
  categoryId: number;
  parentId: number;

  constructor(name: string, categoryId: number, parentId: number) {
    this.name = name;
    this.categoryId = categoryId;
    this.parentId = parentId;
  }
}
