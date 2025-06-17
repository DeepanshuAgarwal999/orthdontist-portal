import axiosInstance from "@/lib/axios";

export class UserService {
  static async getAllUsers() {
    const response = await axiosInstance.get("/users");
    return response.data;
  }
}
