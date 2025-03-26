export function createMockService<T>(): jest.Mocked<T> {
  const mock = {} as jest.Mocked<T>;

  return new Proxy(mock, {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop as keyof T];
      }
      const mockFn = jest.fn();
      (target as any)[prop] = mockFn;
      return mockFn;
    },
  });
}
