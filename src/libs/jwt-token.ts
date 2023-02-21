import { ENV_ENCRYPT_KEY } from "./../main/configs/setup-env";
import { sign } from "jsonwebtoken";

export class JwtToken {
  static get(data: object) {
    const token = sign(data, ENV_ENCRYPT_KEY);
    return token;
  }
}
