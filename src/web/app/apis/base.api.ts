import { clientConfig } from "@push-manager/shared/configs/client.config";
import {
  ErrorResponse,
  SuccessResponse,
} from "@push-manager/shared/types/response.type";
import { useLoadingStore } from "../store";

export class BaseAPI {
  protected baseURL: string;
  protected defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  constructor() {
    this.baseURL = `${clientConfig.web.url}:${clientConfig.server.port}`;
  }

  protected async customFetch<T>(
    path: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      useLoadingStore.getState().setIsLoading(true);

      const headers = {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      };

      const response = await fetch(this.getFullURL(path), {
        ...options,
        headers,
      });

      const serverResponse = (await response.json()) as
        | SuccessResponse<T>
        | ErrorResponse;

      if (!serverResponse.success) {
        const error = serverResponse as ErrorResponse;
        throw new Error(error.error.message || "API request failed");
      }

      return serverResponse.data!;
    } finally {
      useLoadingStore.getState().setIsLoading(false);
    }
  }

  protected getFullURL(path: string): string {
    return `${this.baseURL}${path}`;
  }

  protected addHeaders(headers: HeadersInit): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
  }
}
