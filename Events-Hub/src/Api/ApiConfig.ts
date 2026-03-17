import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL: string = ""; 

// إنشاء نسخة axios مع تحديد النوع
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor لإضافة التوكن
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

/**
 * تعريف واجهة الاستجابة الموحدة (اختياري حسب نظام السيرفر عندك)
 * قمت بإضافتها لتسهيل التعامل مع الـ Data في الـ Context
 */
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
      // إذا كانت البيانات المرسلة FormData، نحذف Content-Type ليقوم المتصفح بتحديده تلقائياً مع الـ boundary
      headers: data instanceof FormData ? { ...config?.headers, 'Content-Type': 'multipart/form-data' } : config?.headers
    });
    
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "حدث خطأ في الاتصال بالسيرفر";
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      // نتحقق من وجود window لتجنب أخطاء الـ SSR
      if (typeof window !== 'undefined') {
        window.location.href = "/login";
      }
    }

    throw new Error(errorMessage);
  }
};

export default api;