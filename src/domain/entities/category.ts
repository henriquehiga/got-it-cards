import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { MissingFieldError } from "./errors/missing-field-error";
import { CategoryModel } from "./models/category-model";

export class Category {
  private _props: CategoryModel.Model;

  constructor(props: CategoryModel.Model) {
    this._props = props;
  }

  get props(): CategoryModel.Model {
    return this._props;
  }

  static create(props: CategoryModel.Model): Either<ErrorResponse, Category> {
    const propsValidate = this.validate(props);
    if (!propsValidate.valid) {
      return left({
        msg: propsValidate.error?.message,
        error: propsValidate.error,
      });
    }
    return right(new Category(props));
  }

  static validate(props: CategoryModel.Model | any): {
    valid: boolean;
    error?: Error;
  } {
    const keys = Object.keys(props);
    for (const key of keys) {
      if (!props[key]) {
        return {
          valid: false,
          error: new MissingFieldError(key),
        };
      }
    }
    return {
      valid: true,
    };
  }
}
