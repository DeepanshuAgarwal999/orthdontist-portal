import Blogs from '@/components/blogs';
import { BlogsService } from '@/service/blog.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const BlogsPage = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['blogs'],
        queryFn: () => BlogsService.getAllBlogs(),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Blogs />
        </HydrationBoundary>
    )
}

export default BlogsPage