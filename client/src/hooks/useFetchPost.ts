import fetchPostService from "@services/posts/fetchPostService";
import { UUID } from "crypto";
import { useQuery } from "@tanstack/react-query";

export default function useFetchPost(postId: string | UUID) {

    const { isLoading, data: post } = useQuery({
        queryKey: ["posts", postId],
        queryFn: () => fetchPostService(postId),
    })

    return { isLoading, post };
}