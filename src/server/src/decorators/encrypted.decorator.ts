import { encryptFields } from "../utils/crypto.util";

export function Encrypted(
  encryptedFields: string[] = ["memNo", "unifyId", "ci"]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // args[0]이 배열인 경우 각 요소를 직접 암호화
      if (Array.isArray(args[0])) {
        const encryptedArray = args[0].map((item) =>
          typeof item === "string"
            ? encryptFields({ value: item }, ["value"], false).value
            : item
        );
        return originalMethod.apply(this, [encryptedArray]);
      }

      // 객체인 경우 기존 로직 유지
      const encryptedOptions = encryptFields(args[0], encryptedFields);

      return originalMethod.apply(this, [encryptedOptions]);
    };
    return descriptor;
  };
}
