import { describe, expect, it } from "vitest";
import { ErrorResponse } from "../../shared/error-response";
import { MissingFieldError } from "./errors/missing-field-error";
import { UserModel } from "./models/user-model";
import { User } from "./user";

describe("User Entity", () => {
  it("should return a user if correct data is provided", () => {
    const data: UserModel.Model = {
      email: "valid@mail.com",
      name: "valid name",
      password: "valid_hashed_password",
      last_login: "2022-05-11",
    };
    const user = User.create(data).value as User;
    expect(user).toBeInstanceOf(User);
    expect(user.props).toEqual(data);
  });

  it("should return an MissingFieldError if NAME is not provided", () => {
    const data: UserModel.Model = {
      email: "valid@mail.com",
      name: "",
      password: "valid_hashed_password",
      last_login: "2022-05-11",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.msg).toEqual(new MissingFieldError("name").message);
  });

  it("should return an MissingFieldError if EMAIL is not provided", () => {
    const data: UserModel.Model = {
      email: "",
      name: "valid name",
      password: "valid_hashed_password",
      last_login: "2022-05-11",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("email"));
    expect(error.msg).toEqual(new MissingFieldError("email").message);
  });

  it("should return an MissingFieldError if NAME is not provided", () => {
    const data: UserModel.Model = {
      email: "valid@mail.com",
      name: "",
      password: "valid_hashed_password",
      last_login: "2022-05-11",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("name"));
    expect(error.msg).toEqual(new MissingFieldError("name").message);
  });

  it("should return an MissingFieldError if PASSWORD is not provided", () => {
    const data: UserModel.Model = {
      email: "valid@mail.com",
      name: "valid name",
      password: "",
      last_login: "2022-05-11",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("password"));
    expect(error.msg).toEqual(new MissingFieldError("password").message);
  });
});
