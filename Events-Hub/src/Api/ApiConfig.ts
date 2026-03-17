import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL: string =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development" ? "/" : "/api");

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export interface ApiResponse<T = any> {
  data: T;
  code: number;
  message: string;
}

export const safeRequest = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data: any = null,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api({
      method: method,
      url: url,
      data: data,
      ...config,
      headers: data instanceof FormData ? { ...config?.headers, 'Content-Type': 'multipart/form-data' } : config?.headers
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "حدث خطأ في الاتصال بالسيرفر";
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      if (typeof window !== 'undefined') {
        window.location.href = "/login";
      }
    }

    throw new Error(errorMessage);
  }
};

export default api;
