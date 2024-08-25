import fetchUserRepliesService from "@services/media/getUserMediaService";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUserMedia(userId: string) {
    const { isLoading: mediaLoading, data: postsWithMedia, error: mediaError } = useQuery({
        queryKey: ["postsWithMedia", userId],
        queryFn: () => fetchUserRepliesService(userId)
    });

    return { mediaLoading, postsWithMedia, mediaError };
}