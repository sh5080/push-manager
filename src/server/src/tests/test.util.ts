import request from "supertest";
import { app } from "../index";
import { PaginatedResponse, SuccessResponse } from "@push-manager/shared";

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

export const apiRequest = {
  get: async (url: string, query?: any, status?: number) => {
    const response = await request(app)
      .get(`/api${url}`)
      .query(query || {})
      .expect(status || 200);
    return response.body as SuccessResponse<any> | PaginatedResponse<any>;
  },

  getById: async (url: string, id: number, status?: number) => {
    const response = await request(app)
      .get(`/api${url}/${id}`)
      .expect(status || 200);
    const body = response.body as SuccessResponse<any> | PaginatedResponse<any>;
    return body;
  },

  post: async (url: string, data: any, status?: number) => {
    const response = await request(app)
      .post(`/api${url}`)
      .send(data)
      .expect(status || 200);

    return response.body as SuccessResponse<any> | PaginatedResponse<any>;
  },

  put: async (url: string, id: number, data: any, status?: number) => {
    const response = await request(app)
      .put(`/api${url}/${id}`)
      .send(data)
      .expect(status || 200);

    return response.body as SuccessResponse<any> | PaginatedResponse<any>;
  },

  patch: async (url: string, id: number, data: any, status?: number) => {
    const response = await request(app)
      .patch(`/api${url}/${id}`)
      .send(data)
      .expect(status || 200);

    return response.body as SuccessResponse<any> | PaginatedResponse<any>;
  },

  delete: async (url: string, id: number, status?: number) => {
    const response = await request(app)
      .delete(`/api${url}/${id}`)
      .expect(status || 204);

    return response.body as SuccessResponse<any> | PaginatedResponse<any>;
  },
};
