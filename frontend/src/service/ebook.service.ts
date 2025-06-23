import axiosInstance from "@/config/axios.instance";

export class EbookService {
  // Get all published courses
  static async getAllBooks() {
    const response = await axiosInstance.get(`/ebooks`);
    return response.data;
  }
}
