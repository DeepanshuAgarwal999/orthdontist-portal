export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  category?: string;
  tags?: string[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  authorId: string;
  viewCount: number;
  likeCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isForDentist?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}
