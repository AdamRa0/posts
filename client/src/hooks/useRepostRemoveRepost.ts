import { removeRepostService, repostPostService } from "@services/posts/repostPostService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRepost() {
    const queryClient = useQueryClient();

    const { mutate: repost } = useMutation({
        mutationFn: repostPostService,
        onSuccess: () => {
            toast.success("Post Reposted");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { repost };
}

export function useRemoveRepost() {
    const queryClient = useQueryClient();

    const { mutate: removeRepost } = useMutation({
        mutationFn: removeRepostService,
        onSuccess: () => {
            toast.success("Repost Removed");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { removeRepost };
}