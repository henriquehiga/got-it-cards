import { Crypto } from "../crypto";
import { CryptoProtocol } from "./protocols/crypto-protocol";

export class CryptoAdapter implements CryptoProtocol {
  decrypt(data: string): string {
    return Crypto.decrypt(data);
  }
  compareHash(data: string, hash: string): boolean {
    return Crypto.compareHash(data, hash);
  }
}
