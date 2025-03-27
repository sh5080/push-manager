import { plainToInstance, ClassConstructor } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { BadRequestException } from "../types/error.type";

export async function validateDto<T extends object>(
  dto: ClassConstructor<T>,
  data: object
): Promise<T> {
  const dtoInstance = plainToInstance(dto, data);
  try {
    await validateOrReject(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    return dtoInstance;
  } catch (errors) {
    const messages = (errors as ValidationError[])
      .map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints);
        }
        if (error.children?.length) {
          return error.children
            .map((child) => Object.values(child.constraints || {}))
            .flat();
        }
        return [];
      })
      .flat();

    throw new BadRequestException(messages.join(", "));
  }
}
