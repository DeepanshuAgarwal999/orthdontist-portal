export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  readingTime?: number;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: "DRAFT" | "PUBLISHED";
  tags?: string[];
}

export interface UpdateBlogRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags?: string[];
}

export interface BlogListResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}
