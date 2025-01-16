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
export interface Rnum {
  rnum: number;
}

export interface PaginatedResponse<T> {
  data: (T & Rnum)[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
