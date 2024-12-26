import { clientConfig } from "@push-manager/shared/configs/client.config";
import { SuccessResponse } from "@push-manager/shared/types/response.type";

export class BaseAPI {
  protected baseURL: string;
  private static loadingCallback?: () => void;
  private static hideLoadingCallback?: () => void;
  protected defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  constructor() {
    this.baseURL = `${clientConfig.web.url}:${clientConfig.server.port}`;
  }

  public static setLoadingCallbacks(
    showLoading: () => void,
    hideLoading: () => void
  ) {
    BaseAPI.loadingCallback = showLoading;
    BaseAPI.hideLoadingCallback = hideLoading;
  }

  protected async customFetch<T>(
    path: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      BaseAPI.loadingCallback?.();

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
      BaseAPI.hideLoadingCallback?.();
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
