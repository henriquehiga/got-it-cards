import { CategoryModel } from "../../domain/entities/models/category-model";
import { CategoryRepository } from "./../protocols/category-repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  private db: CategoryModel.Model[] = [];

  async save(data: CategoryModel.Model): Promise<CategoryModel.Model> {
    this.db.push(data);
    return data;
  }

  async findByUserId(data: string): Promise<CategoryModel.Model[]> {
    const foundedList: CategoryModel.Model[] = [];
    this.db.forEach(
      (category) => data === category.user_id && foundedList.push(category)
    );
    return foundedList;
  }
}
