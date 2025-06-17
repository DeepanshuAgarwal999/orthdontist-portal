import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
  timeout: 3 * 60 * 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't redirect if it's a login request (to allow form error handling)
      const isLoginRequest = error.config?.url?.includes("/auth/login");

      if (typeof window !== "undefined" && !isLoginRequest) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
