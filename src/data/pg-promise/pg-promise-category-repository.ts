import { CategoryModel } from "../../domain/entities/models/category-model";
import { db } from "../../infra/pg-promise";
import { CategoryRepository } from "../protocols/category-repository";

enum CategoryRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.categories(id, name, description, user_id) VALUES (${id}, ${name}, ${description}, ${user_id});",
  FIND_BY_USER_ID = "SELECT * FROM gotitcards.categories WHERE user_id = $1;",
}

export class PgPromiseCategoryRepository implements CategoryRepository {
  async findByUserId(data: string): Promise<CategoryModel.Model[]> {
    try {
      const categories = await db.manyOrNone<CategoryModel.Model>(
        CategoryRepositoryQueries.FIND_BY_USER_ID,
        data
      );
      return categories ?? [];
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }

  async save(data: CategoryModel.Model): Promise<CategoryModel.Model> {
    try {
      await db.none(CategoryRepositoryQueries.SAVE, data);
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.toString());
    }
  }
}
