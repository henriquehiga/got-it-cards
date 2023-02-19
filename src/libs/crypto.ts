import crypto from "crypto-js";
import bcrypt from "bcrypt";
import { ENV_ENCRYPT_KEY } from "../main/configs/setup-env";

export class Crypto {
  static encrypt(data: string) {
    let encrypted = crypto.AES.encrypt(data, ENV_ENCRYPT_KEY).toString();
    return encrypted;
  }

  static decrypt(data: string) {
    const bytes = crypto.AES.decrypt(data, ENV_ENCRYPT_KEY);
    const decrypted = bytes.toString(crypto.enc.Utf8);
    return decrypted;
  }

  static hash(data: string) {
    const hashed = bcrypt.hashSync(data, 10);
    return hashed;
  }

  static compareHash(data: string, hash: string) {
    const same = bcrypt.compareSync(data, hash);
    return same;
  }
}
