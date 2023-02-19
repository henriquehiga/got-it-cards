import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { MissingFieldError } from "./errors/missing-field-error";
import { UserModel } from "./models/user-model";

export class User {
  private _props: UserModel.Model;

  constructor(data: UserModel.Model) {
    this._props = data;
  }

  get props(): UserModel.Model {
    return this._props;
  }

  static create(data: UserModel.Model): Either<ErrorResponse, User> {
    const propsValidate = this.validate(data);
    if (!propsValidate.valid) {
      return left({
        msg: propsValidate.error?.message,
        error: propsValidate.error,
      });
    }
    return right(new User(data));
  }

  static validate(props: UserModel.Model | any): {
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
