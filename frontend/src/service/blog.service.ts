import axiosInstance from "@/config/axios.instance";
import { BlogsResponse, BlogResponse, BlogQueryParams } from "@/types/blog";

export class BlogsService {
  static async getAllBlogs(params?: BlogQueryParams): Promise<BlogsResponse> {
    const searchParams = new URLSearchParams();

    Object.keys(params || {}).forEach((key) => {
      const value = params![key as keyof BlogQueryParams];
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const url = `/blogs/public${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const response = await axiosInstance.get(url);
    return response.data;
  }

  static async getBlogById(id: string): Promise<BlogResponse> {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  }

  static async getBlogBySlug(slug: string): Promise<BlogResponse> {
    const response = await axiosInstance.get(`/blogs/slug/${slug}`);
    return response.data;
  }

  static async searchBlogs(query: string, filters?: BlogQueryParams): Promise<BlogsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("q", query);

    if (filters?.category) searchParams.append("category", filters.category);
    if (filters?.page) searchParams.append("page", filters.page.toString());
    if (filters?.limit) searchParams.append("limit", filters.limit.toString());

    const response = await axiosInstance.get(`/blogs/search?${searchParams.toString()}`);
    return response.data;
  }
  static async getBlogCategories(): Promise<{ data: [] }> {
    const response = await axiosInstance.get(`/blogs/categories`);
    return response.data;
  }
}
