import fetchPostsService from "@/services/posts/fetchPostsService"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useFetchPosts() {
    const {
        data: posts,
        error,
        fetchNextPage,
        hasNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }: { pageParam: number }) => fetchPostsService(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => lastPage.length === 20 ? allPages.length + 1 : undefined,
    });

    return { posts, error, fetchNextPage, hasNextPage, status };
}