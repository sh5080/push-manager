export interface SuccessResponse<T> {
  success: true;
  data?: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    status: number;
  };
}
