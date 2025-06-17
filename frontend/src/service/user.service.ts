import axiosInstance from "@/config/axios.instance";

export class UserService {
  static async login({ email, password }: { email: string; password: string }) {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }
  static async signUp(credentials: any) {
    const response = await axiosInstance.post("/auth/signup", credentials);
    return response.data;
  }
  static async forgotPassword({ email }: { email: string }) {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  }

  static async resetPassword({ token, password }: { token: string; password: string }) {
    const response = await axiosInstance.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  }
  static async getUser() {
    const response = await axiosInstance.get("/auth/get-logged-in-user");
    return response.data;
  }
  static async verifyEmail(token: string) {
    const response = await axiosInstance.post("/auth/verify-email", {
      token,
    });
    return response.data;
  }
  static async verifyResetPassword({ token, newPassword }: { token: string; newPassword: string }) {
    const response = await axiosInstance.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  }
}
