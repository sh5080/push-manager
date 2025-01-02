import { clientConfig } from "@push-manager/shared/configs/client.config";
import { SuccessResponse } from "@push-manager/shared/types/response.type";
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const serverResponse = (await response.json()) as SuccessResponse<T>;
      if (!serverResponse.success) {
        throw new Error(serverResponse.message || "API request failed");
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
