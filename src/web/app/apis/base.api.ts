import { clientConfig } from "@push-manager/shared/configs/client.config";
import {
  ErrorResponse,
  SuccessResponse,
} from "@push-manager/shared/types/response.type";
import { useLoadingStore, useAuthStore } from "../store";
import { useLoginModal } from "../common/hooks/useLoginModal.hook";

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

      const requestOptions: RequestInit = {
        ...options,
        credentials: "include",
        headers: this.getHeaders(options?.headers),
      };

      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        requestOptions.headers = {
          ...requestOptions.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      if (path.includes("?")) {
        const [basePath, queryString] = path.split("?");

        const encodedParams = queryString
          .split("&")
          .map((param) => {
            const firstEqualIndex = param.indexOf("=");
            const key = param.slice(0, firstEqualIndex);
            const value = param.slice(firstEqualIndex + 1);

            // URL 예약어 포함 여부 체크
            const hasReservedChars = /[&+\s?#/=]/.test(value);
            return hasReservedChars
              ? `${key}=${encodeURIComponent(value)}`
              : `${key}=${value}`;
          })
          .join("&");

        path = `${basePath}?${encodedParams}`;
      }

      const response = await fetch(this.getFullURL(path), requestOptions);

      const serverResponse = (await response.json()) as
        | SuccessResponse<T>
        | ErrorResponse;
      if (
        "error" in serverResponse &&
        serverResponse.error.message.startsWith("비밀번호")
      ) {
        useLoginModal.getState().onOpen();
        throw serverResponse.error;
      }

      if (
        response.status === 401 ||
        ("error" in serverResponse &&
          serverResponse.error.message.startsWith("로그인"))
      ) {
        useLoginModal.getState().onOpen();
        throw new Error("로그인이 필요합니다.");
      }

      const newAccessToken = response.headers.get("Authorization");
      if (newAccessToken) {
        useAuthStore
          .getState()
          .setAccessToken(newAccessToken.replace("Bearer ", ""));
      }

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

  protected getHeaders(additionalHeaders?: HeadersInit): HeadersInit {
    return {
      ...this.defaultHeaders,
      ...(additionalHeaders || {}),
    };
  }
}
