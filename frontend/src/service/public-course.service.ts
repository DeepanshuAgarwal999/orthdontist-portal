import axiosInstance from "@/config/axios.instance";

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  slug: string;
  content: string;
  duration: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  category: string;
  tags: string[];
  thumbnailImage?: string;
  videoUrl?: string;
  attachments: string[];
  price: number;
  currency: string;
  isFreeCourse: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "UNDER_REVIEW";
  isActive: boolean;
  maxEnrollments?: number;
  metaTitle?: string;
  metaDescription?: string;
  enrollmentCount: number;
  viewCount: number;
  rating?: number;
  reviewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  progress: number;
  completedAt?: string;
  paymentId?: string;
  amountPaid?: number;
  course: Course;
}

export interface CourseQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export class PublicCourseService {
  // Get all published courses (public access)
  static async getCourses(query?: CourseQuery) {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", query.page.toString());
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.search) params.append("search", query.search);
    if (query?.sortBy) params.append("sortBy", query.sortBy);
    if (query?.sortOrder) params.append("sortOrder", query.sortOrder);

    const response = await axiosInstance.get(`/courses?${params.toString()}`);
    return response.data;
  }

  // Get course by ID (public access for published courses)
  static async getCourseById(id: string) {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  }

  // Get course by slug (public access for published courses)
  static async getCourseBySlug(slug: string) {
    const response = await axiosInstance.get(`/courses/slug/${slug}`);
    return response.data;
  }

  // Search courses (public access)
  static async searchCourses(query: string, filters?: Partial<CourseQuery>) {
    const params = new URLSearchParams();
    params.append("q", query);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.level) params.append("level", filters.level);

    const response = await axiosInstance.get(`/courses/search?${params.toString()}`);
    return response.data;
  }

  // Enroll in course (requires authentication)
  static async enrollInCourse(courseId: string) {
    const response = await axiosInstance.post(`/courses/${courseId}/enroll`);
    return response.data;
  }
  // Get my enrollments (requires authentication)
  static async getMyEnrollments(query?: CourseQuery) {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", query.page.toString());
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.status) params.append("status", query.status);

    const response = await axiosInstance.get(`/courses/enrollment/my-enrollments?${params.toString()}`);
    return response.data;
  }

  // Update enrollment progress (requires authentication)
  static async updateEnrollmentProgress(enrollmentId: string, progress: number) {
    const response = await axiosInstance.patch(`/courses/enrollments/${enrollmentId}/progress`, {
      progress,
    });
    return response.data;
  }

  // Cancel enrollment (requires authentication)
  static async cancelEnrollment(enrollmentId: string) {
    const response = await axiosInstance.delete(`/courses/enrollments/${enrollmentId}`);
    return response.data;
  }
}
