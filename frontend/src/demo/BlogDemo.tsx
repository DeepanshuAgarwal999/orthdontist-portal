import React from 'react';
import { Blog, BlogsResponse } from '@/types/blog';

// Mock data for demonstration
export const mockBlogs: Blog[] = [
    {
        id: '1',
        title: '10 Essential Tips for Better Oral Health',
        content: `<p>Maintaining good oral health is crucial for your overall well-being. Here are 10 essential tips that every patient should know:</p>
    
    <h3>1. Brush Twice Daily</h3>
    <p>Use fluoride toothpaste and brush for at least two minutes, twice a day. This removes plaque and prevents tooth decay.</p>
    
    <h3>2. Floss Daily</h3>
    <p>Flossing removes food particles and plaque from between teeth where your toothbrush can't reach.</p>
    
    <h3>3. Use Mouthwash</h3>
    <p>An antimicrobial mouthwash can help reduce bacteria and freshen breath.</p>
    
    <h3>4. Regular Dental Checkups</h3>
    <p>Visit your dentist every six months for professional cleaning and early detection of problems.</p>
    
    <h3>5. Limit Sugary Foods</h3>
    <p>Reduce consumption of sugary snacks and drinks that can lead to tooth decay.</p>`,
        excerpt: 'Discover the top 10 essential tips for maintaining excellent oral health and preventing dental problems.',
        slug: 'essential-tips-oral-health',
        status: 'PUBLISHED',
        category: 'Dental Health',
        tags: ['oral health', 'prevention', 'tips', 'dental care'],
        featuredImage: '/images/oral-health-tips.jpg',
        metaTitle: '10 Essential Tips for Better Oral Health - Dental Care Guide',
        metaDescription: 'Learn the top 10 essential tips for maintaining excellent oral health and preventing dental problems.',
        authorId: '1',
        author: {
            id: '1',
            firstName: 'Dr. Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@dental.com',
            role: 'Senior Dentist'
        },
        viewCount: 1250,
        likeCount: 89,
        publishedAt: '2024-01-15T10:00:00Z',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        title: 'Modern Orthodontic Solutions: Invisalign vs Traditional Braces',
        content: `<p>Choosing the right orthodontic treatment can be overwhelming. Let's compare Invisalign and traditional braces to help you make an informed decision.</p>
    
    <h3>Invisalign Advantages</h3>
    <ul>
      <li>Nearly invisible appearance</li>
      <li>Removable for eating and cleaning</li>
      <li>Comfortable with no metal brackets</li>
      <li>Fewer office visits required</li>
    </ul>
    
    <h3>Traditional Braces Advantages</h3>
    <ul>
      <li>Effective for complex cases</li>
      <li>Lower cost option</li>
      <li>No risk of losing aligners</li>
      <li>Proven track record</li>
    </ul>`,
        excerpt: 'Compare Invisalign and traditional braces to find the best orthodontic solution for your needs.',
        slug: 'invisalign-vs-traditional-braces',
        status: 'PUBLISHED',
        category: 'Orthodontics',
        tags: ['orthodontics', 'invisalign', 'braces', 'treatment'],
        featuredImage: '/images/orthodontics-comparison.jpg',
        metaTitle: 'Invisalign vs Traditional Braces - Complete Comparison Guide',
        metaDescription: 'Compare Invisalign and traditional braces to find the best orthodontic solution for your needs.',
        authorId: '2',
        author: {
            id: '2',
            firstName: 'Dr. Michael',
            lastName: 'Chen',
            email: 'michael.chen@dental.com',
            role: 'Orthodontist'
        },
        viewCount: 980,
        likeCount: 67,
        publishedAt: '2024-01-12T14:30:00Z',
        createdAt: '2024-01-08T14:30:00Z',
        updatedAt: '2024-01-12T14:30:00Z'
    },
    {
        id: '3',
        title: 'The Complete Guide to Dental Implants',
        content: `<p>Dental implants are a revolutionary solution for missing teeth. This comprehensive guide covers everything you need to know.</p>
    
    <h3>What are Dental Implants?</h3>
    <p>Dental implants are titanium posts surgically placed into the jawbone to replace missing tooth roots.</p>
    
    <h3>Benefits of Dental Implants</h3>
    <ul>
      <li>Permanent solution</li>
      <li>Natural appearance and feel</li>
      <li>Preserves jawbone health</li>
      <li>No impact on adjacent teeth</li>
    </ul>
    
    <h3>The Implant Process</h3>
    <p>The process typically involves consultation, implant placement, healing period, and crown attachment.</p>`,
        excerpt: 'Learn everything about dental implants, from the procedure to benefits and aftercare.',
        slug: 'complete-guide-dental-implants',
        status: 'PUBLISHED',
        category: 'Oral Surgery',
        tags: ['dental implants', 'tooth replacement', 'surgery', 'restoration'],
        featuredImage: '/images/dental-implants-guide.jpg',
        metaTitle: 'Complete Guide to Dental Implants - Everything You Need to Know',
        metaDescription: 'Learn everything about dental implants, from the procedure to benefits and aftercare.',
        authorId: '3',
        author: {
            id: '3',
            firstName: 'Dr. Emily',
            lastName: 'Rodriguez',
            email: 'emily.rodriguez@dental.com',
            role: 'Oral Surgeon'
        },
        viewCount: 1500,
        likeCount: 112,
        publishedAt: '2024-01-10T09:00:00Z',
        createdAt: '2024-01-05T09:00:00Z',
        updatedAt: '2024-01-10T09:00:00Z'
    }
];

export const mockBlogsResponse: BlogsResponse = {
    success: true,
    message: 'Blogs retrieved successfully',
    data: mockBlogs,
    pagination: {
        page: 1,
        limit: 9,
        total: 3,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
    }
};

// You can use this mock data for testing:
// import { mockBlogsResponse } from '@/demo/BlogDemo';
// <BlogList initialBlogs={mockBlogsResponse} />
