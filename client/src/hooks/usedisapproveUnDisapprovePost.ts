import { disapprovePostService, undisapprovePostService } from "@services/posts/disapprovePostService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDispprovePost() {
    const queryClient = useQueryClient();

    const { mutate: disapprove } = useMutation({
        mutationFn: disapprovePostService,
        onSuccess: () => {
            toast.success("Post disapproved");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { disapprove };
}

export function useUndisapprovePost() {
    const queryClient = useQueryClient();

    const { mutate: undisapprove } = useMutation({
        mutationFn: undisapprovePostService,
        onSuccess: () => {
            toast.success("Disapproval Removed");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { undisapprove };
}