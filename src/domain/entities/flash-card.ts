import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { MissingFieldError } from "./errors/missing-field-error";
import { FlashCardModel } from "./models/flash-card-model";

export class FlashCard {
  private _props: FlashCardModel.Model;

  constructor(props: FlashCardModel.Model) {
    this._props = props;
  }

  get props(): FlashCardModel.Model {
    return this._props;
  }

  static create(props: FlashCardModel.Model): Either<ErrorResponse, FlashCard> {
    const propsValidate = this.validate(props);
    if (!propsValidate.valid) {
      return left({
        msg: propsValidate.error?.message,
        error: propsValidate.error,
      });
    }
    return right(new FlashCard(props));
  }

  static validate(props: FlashCardModel.Model | any): {
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
