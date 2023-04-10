export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}  

export type ApiError = {
    message: string;
    code: number;
  }