# Blog API Documentation

This document provides detailed information about the Blog API endpoints for the Dentist Portal backend.

## Overview

The Blog API allows administrators to perform CRUD (Create, Read, Update, Delete) operations on blog posts. The API includes:

- Professional blog management with SEO features
- Role-based access control (Admin only for management operations)
- Public access for reading published blogs
- Advanced search and filtering capabilities
- Blog status management (Draft, Published, Archived)
- Analytics tracking (views, likes)

## Base URL

```
http://localhost:8080/api/v1/blogs
```

## Authentication

Most admin operations require authentication with an admin role. Authentication is handled via JWT tokens stored in HTTP-only cookies or Authorization headers.

## Blog Model Schema

```typescript
{
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string; // Auto-generated URL-friendly version
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  category?: string;
  tags?: string[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  authorId: string;
  author: User;
  viewCount: number;
  likeCount: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Admin Routes (Authentication Required - Admin Role)

#### 1. Create Blog

```http
POST /api/v1/blogs
Content-Type: application/json
Authorization: Bearer <token> (or cookie)

{
  "title": "Understanding Dental Hygiene",
  "content": "Comprehensive guide to maintaining proper dental hygiene...",
  "excerpt": "A brief overview of dental hygiene best practices",
  "category": "Dental Care",
  "tags": ["hygiene", "prevention", "health"],
  "featuredImage": "https://example.com/image.jpg",
  "metaTitle": "Dental Hygiene Guide | Dentist Portal",
  "metaDescription": "Learn essential dental hygiene practices for better oral health",
  "status": "DRAFT"
}
```

#### 2. Get All Blogs (Admin View)

```http
GET /api/v1/blogs/admin?page=1&limit=10&status=PUBLISHED&search=dental&category=health&sortBy=createdAt&sortOrder=desc
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): DRAFT | PUBLISHED | ARCHIVED
- `search` (optional): Search in title, content, excerpt
- `category` (optional): Filter by category
- `authorId` (optional): Filter by author
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): asc | desc (default: desc)

#### 3. Get Blog Statistics

```http
GET /api/v1/blogs/admin/statistics
```

#### 4. Update Blog

```http
PUT /api/v1/blogs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "PUBLISHED",
  "tags": ["updated", "health"]
}
```

#### 5. Publish Blog

```http
PATCH /api/v1/blogs/:id/publish
Content-Type: application/json

{
  "publishedAt": "2025-06-14T10:00:00Z" // Optional, defaults to now
}
```

#### 6. Unpublish Blog

```http
PATCH /api/v1/blogs/:id/unpublish
```

#### 7. Delete Blog

```http
DELETE /api/v1/blogs/:id
```

### Public Routes (No Authentication Required)

#### 1. Get Published Blogs

```http
GET /api/v1/blogs?page=1&limit=10&category=health&search=dental
```

#### 2. Search Blogs

```http
GET /api/v1/blogs/search?q=dental+hygiene&category=health
```

#### 3. Get Blog by Slug

```http
GET /api/v1/blogs/slug/understanding-dental-hygiene
```

#### 4. Get Blog by ID

```http
GET /api/v1/blogs/:id
```

## Response Format

All API responses follow this consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "pagination": {
    // Only for list endpoints
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "error": "Bad Request"
}
```

## Blog Status Workflow

1. **DRAFT**: Initial state when blog is created
2. **PUBLISHED**: Blog is live and visible to public
3. **ARCHIVED**: Blog is hidden from public but preserved

## SEO Features

- **Slug Generation**: Automatic URL-friendly slug generation from title
- **Meta Tags**: Support for custom meta title and description
- **Unique Slugs**: Automatic handling of duplicate slugs with counters
- **Search Optimization**: Full-text search across title, content, and excerpt

## Analytics

- **View Tracking**: Automatic view count increment for published blogs
- **Like System**: Ready for future like functionality
- **Statistics**: Comprehensive analytics for admins

## Security Features

- **Role-based Access**: Only admins can manage blogs
- **Input Validation**: Comprehensive validation using class-validator
- **SQL Injection Protection**: Prisma ORM provides built-in protection
- **XSS Prevention**: Input sanitization and validation

## Error Handling

The API includes comprehensive error handling for:

- Invalid input data (400 Bad Request)
- Unauthorized access (401 Unauthorized)
- Forbidden operations (403 Forbidden)
- Resource not found (404 Not Found)
- Server errors (500 Internal Server Error)

## Usage Examples

### Creating a blog post:

```bash
curl -X POST http://localhost:8080/api/v1/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "5 Tips for Better Oral Health",
    "content": "Here are five essential tips...",
    "category": "Health Tips",
    "tags": ["oral health", "prevention", "tips"]
  }'
```

### Getting published blogs:

```bash
curl http://localhost:8080/api/v1/blogs?page=1&limit=5
```

### Searching blogs:

```bash
curl "http://localhost:8080/api/v1/blogs/search?q=dental%20care"
```

## Notes

- All date fields are in ISO 8601 format
- File uploads for featured images should be handled separately
- The slug field is automatically generated but can be customized
- Blog content supports rich text/HTML formatting
- Tags are stored as an array for flexible categorization
