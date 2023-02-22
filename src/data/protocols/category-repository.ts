import { CategoryModel } from "../../domain/entities/models/category-model";

export interface CategoryRepository {
  save(data: CategoryModel.Model): Promise<CategoryModel.Model>;
  findByUserId(data: string): Promise<CategoryModel.Model[]>;
}
