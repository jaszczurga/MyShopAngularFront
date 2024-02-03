export class CategoryDto {
  id: number;
  categoryName: string;
  constructor(id: number, categoryName: string) {
    this.id = id;
    this.categoryName = categoryName;
  }
}
