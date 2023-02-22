import { Category } from "./category";
import { describe, expect, it, test } from "vitest";
import { FlashCard } from "./flash-card";
import { CategoryModel } from "./models/category-model";
import { MissingFieldError } from "./errors/missing-field-error";
import { ErrorResponse } from "../../shared/error-response";

describe("Category Entity", () => {
  it("should return a category if correct data is provided", () => {
    const data: CategoryModel.Model = {
      id: "valid-id",
      name: "valid-name",
      description: "valid-description",
      user_id: "valid-user-id",
    };
    const category = Category.create(data).value as Category;
    expect(category).toBeInstanceOf(Category);
    expect(category.props).toEqual(data);
    expect(category.props.id).toBe("valid-id");
  });

  it("should return an MissingFieldError if ID is not provided", () => {
    const data: CategoryModel.Model = {
      id: "",
      name: "valid-name",
      description: "valid-description",
      user_id: "valid-user-id",
    };
    const error = Category.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("id"));
    expect(error.msg).toEqual(new MissingFieldError("id").message);
  });

  it("should return an MissingFieldError if NAME is not provided", () => {
    const data: CategoryModel.Model = {
      id: "valid-id",
      name: "",
      description: "valid-description",
      user_id: "valid-user-id",
    };
    const error = Category.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("name"));
    expect(error.msg).toEqual(new MissingFieldError("name").message);
  });

  it("should return an MissingFieldError if DESCRIPTION is not provided", () => {
    const data: CategoryModel.Model = {
      id: "valid-id",
      name: "valid-name",
      description: "",
      user_id: "valid-user-id",
    };
    const error = Category.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("description"));
    expect(error.msg).toEqual(new MissingFieldError("description").message);
  });

  it("should return an MissingFieldError if USER_ID is not provided", () => {
    const data: CategoryModel.Model = {
      id: "valid-id",
      name: "valid-name",
      description: "valid-description",
      user_id: "",
    };
    const error = Category.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("user_id"));
    expect(error.msg).toEqual(new MissingFieldError("user_id").message);
  });
});
