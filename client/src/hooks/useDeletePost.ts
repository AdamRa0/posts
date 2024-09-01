import { UUID } from "crypto";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import deletePostService from "@services/posts/deletePostService";

export default function useDeletePost() {
    const queryClient = useQueryClient();
    const { mutate: deletePost } = useMutation({
        mutationFn: ({ postId }: { postId: UUID }) => deletePostService(postId),
        onSuccess: () => {
            toast.success("Post successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { deletePost };
}