import { cbc } from "@noble/ciphers/aes";
import { hexToBytes, utf8ToBytes } from "@noble/ciphers/utils";
import { envConfig } from "@push-manager/shared";

export const base64ToBytes = (base64: string): Uint8Array => {
  return new Uint8Array(Buffer.from(base64, "base64"));
};
export const bytesToBase64 = (bytes: Uint8Array): string => {
  return Buffer.from(bytes).toString("base64");
};
const jwtSecret = envConfig.server.jwtSecret;
export const aes = () =>
  cbc(hexToBytes(`${jwtSecret}${jwtSecret}`), hexToBytes(`${jwtSecret}`));

export const encryptFields = (
  data: { [key: string]: any },
  fields: string[]
) => {
  fields.forEach((field) => {
    if (data[field]) {
      data[field] = bytesToBase64(aes().encrypt(utf8ToBytes(data[field])));
    }
  });

  return data;
};
