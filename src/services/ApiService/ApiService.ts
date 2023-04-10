import axiosClient from '../../utils/axiosClient';
import { ApiError, ApiResponse } from './ApiService.types';

export class ApiService {

  public async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await axiosClient.get<T>(url);
      return { success: true, data: response.data };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response.data.message,
            code: error.response.data.code
        }
      return { success: false, error: apiError };
    }
  }

  public async post<T, U>(url: string, data: U): Promise<ApiResponse<T>> {
    try {
      const response = await axiosClient.post<T>(url, data);
      return { success: true, data: response.data };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response.data.message,
            code: error.response.data.code
        }
      return { success: false, error: apiError };
    }
  }

  public async put<T, U>(url: string, data: U): Promise<ApiResponse<T>> {
    try {
      const response = await axiosClient.put<T>(url, data);
      return { success: true, data: response.data };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response.data.message,
            code: error.response.data.code
        }
      return { success: false, error: apiError };
    }
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await axiosClient.delete<T>(url);
      return { success: true, data: response.data };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response.data.message,
            code: error.response.data.code
        }
      return { success: false, error: apiError };
    }
  }
}
