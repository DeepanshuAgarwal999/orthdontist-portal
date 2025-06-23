import { axiosInstance } from "@/config/axios.instance";

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  slug: string;
  topic: string;
  tags: string[];
  scheduledAt: string;
  duration: number; // in minutes
  timezone: string;
  meetLink: string;
  meetId?: string;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED" | "POSTPONED";
  isActive: boolean;
  maxParticipants?: number;
  isRecorded: boolean;
  recordingUrl?: string;
  isFree: boolean;
  price?: number;
  currency?: string;
  thumbnailImage?: string;
  materials?: string[];
  metaTitle?: string;
  metaDescription?: string;
  registrationCount: number;
  attendanceCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface LiveSessionQuery {
  search?: string;
  status?: string;
  createdById?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface LiveSessionResponse {
  success: boolean;
  message: string;
  data: LiveSession[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class LiveSessionService {
  // Get all upcoming live sessions (public)
  static async getUpcomingLiveSessions(query?: LiveSessionQuery): Promise<LiveSessionResponse> {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await axiosInstance.get(`/live-sessions?${params.toString()}`);
    return response.data;
  }

  // Get all live sessions (with filters)
  static async getAllLiveSessions(query?: LiveSessionQuery): Promise<LiveSessionResponse> {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await axiosInstance.get(`/live-sessions?${params.toString()}`);
    return response.data;
  }

  // Search live sessions
  static async searchLiveSessions(searchQuery: string, filters?: LiveSessionQuery): Promise<{ success: boolean; message: string; data: LiveSession[]; query: string }> {
    const params = new URLSearchParams();
    params.append("q", searchQuery);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await axiosInstance.get(`/live-sessions/search?${params.toString()}`);
    return response.data;
  }

  // Get live session by ID
  static async getLiveSessionById(id: string): Promise<{ success: boolean; message: string; data: LiveSession }> {
    const response = await axiosInstance.get(`/live-sessions/${id}`);
    return response.data;
  }

  // Get live session by slug
  static async getLiveSessionBySlug(slug: string): Promise<{ success: boolean; message: string; data: LiveSession }> {
    const response = await axiosInstance.get(`/live-sessions/slug/${slug}`);
    return response.data;
  }

  // Get live session categories
  static async getLiveSessionCategories(): Promise<{ success: boolean; message: string; data: string[] }> {
    const response = await axiosInstance.get("/live-sessions/categories");
    return response.data;
  }
}
