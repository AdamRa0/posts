import fetchPostsService from "@/services/posts/fetchPostsService"
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"

export default function useFetchPosts() {
    // const { isLoading, data: posts, error } = useQuery({
    //     queryKey: ["posts"],
    //     queryFn: () => fetchPostsService(page),
    // });

    // return { isLoading, posts, error };
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