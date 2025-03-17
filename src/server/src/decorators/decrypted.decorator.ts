import { bytesToUtf8 } from "@noble/ciphers/utils";
import { aes, base64ToBytes } from "../utils/crypto.util";

export function Decrypted(
  encryptedFields: string[] = ["memNo", "unifyId", "ci"],
  nestedFields: { [key: string]: string[] } = { Member: ["memNo"] }
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    // 객체 복호화 함수
    const decryptObject = (obj: any) => {
      // 최상위 필드 복호화
      encryptedFields.forEach((field) => {
        if (obj[field]) {
          try {
            obj[field] = bytesToUtf8(aes().decrypt(base64ToBytes(obj[field])));
          } catch (error) {
            console.error(`Failed to decrypt field: ${field}`, error);
          }
        }
      });

      // 중첩 객체 복호화
      for (const [modelName, fields] of Object.entries(nestedFields)) {
        if (obj[modelName]) {
          fields.forEach((field) => {
            if (obj[modelName][field]) {
              try {
                obj[modelName][field] = bytesToUtf8(
                  aes().decrypt(base64ToBytes(obj[modelName][field]))
                );
              } catch (error) {
                console.error(
                  `Failed to decrypt nested field: ${modelName}.${field}`,
                  error
                );
              }
            }
          });
        }
      }

      return obj;
    };

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (!result) return result;

      // 단일 객체인 경우
      if (!Array.isArray(result)) {
        return decryptObject(result);
      }

      // 배열인 경우
      return result.map((item) => decryptObject(item));
    };
    return descriptor;
  };
}
