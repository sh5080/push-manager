export function transformDbToEntity<T extends Record<string, any>>(
  data: { [key: string]: any },
  EntityClass: new () => T
): T {
  const entity = new EntityClass() as { [key: string]: any };
  const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());

  Object.keys(data).forEach((key) => {
    const camelKey = snakeToCamel(key);
    entity[camelKey] = data[key];
  });

  return entity as T;
}
