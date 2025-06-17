import axiosInstance from "@/lib/axios";
import { DentistQueryParams, DentistListResponse, DentistStatistics, VerifyDentistRequest } from "@/types/dentist";

export class DoctorService {
  // Get all dentists for admin
  static async getAllDoctors(params?: DentistQueryParams): Promise<DentistListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.city) queryParams.append("city", params.city);
    if (params?.state) queryParams.append("state", params.state);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.specialty) queryParams.append("specialty", params.specialty);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    // Add verification status filter
    if (params?.isVerified !== undefined) {
      queryParams.append("isVerified", params.isVerified.toString());
    }

    // Add active status filter
    if (params?.isActive !== undefined) {
      queryParams.append("isActive", params.isActive.toString());
    }

    const response = await axiosInstance.get(`/dentists/admin?${queryParams.toString()}`);
    return response.data;
  }

  // Get dentist statistics
  static async getDoctorStatistics(): Promise<{ success: boolean; message: string; data: DentistStatistics }> {
    const response = await axiosInstance.get("/dentists/admin/statistics");
    return response.data;
  }

  // Verify/Unverify dentist
  static async verifyDentist(id: string, isVerified: boolean) {
    const response = await axiosInstance.patch(`/dentists/admin/${id}/verify`, {
      isVerified,
    } as VerifyDentistRequest);
    return response.data;
  }

  // Delete dentist
  static async deleteDentist(id: string) {
    const response = await axiosInstance.delete(`/dentists/admin/${id}`);
    return response.data;
  }

  // Update dentist profile (admin)
  static async updateDentistProfile(userId: string, updateData: any) {
    const response = await axiosInstance.put(`/dentists/admin/${userId}`, updateData);
    return response.data;
  }
}
