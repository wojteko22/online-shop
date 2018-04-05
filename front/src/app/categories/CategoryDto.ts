export class CategoryDto {
  name: string;
  shopId: number;
  parentCategoryId: number;

  constructor(name: string, shopId: number, parentCategoryId: number) {
    this.name = name;
    this.shopId = shopId;
    this.parentCategoryId = parentCategoryId;
  }
}
