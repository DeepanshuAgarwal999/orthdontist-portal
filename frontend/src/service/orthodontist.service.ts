import axiosInstance from "@/config/axios.instance";

export class OrthodontistService {
  static async getOrthodontists() {
    const response = await axiosInstance.get("/dentists");
    return response.data;
  }
}
