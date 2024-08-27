import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import createPostService from "@services/posts/createPostService";
import { PostType } from "types/data/postFormType";

export function useCreatePost(post: PostType, formActionRoute: string) {
    const queryClient = useQueryClient();
    const { mutate: createPost } = useMutation({
        mutationFn: () => createPostService(post, formActionRoute),
        onSuccess: () => {
            toast.success("Post created");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    return { createPost };
}