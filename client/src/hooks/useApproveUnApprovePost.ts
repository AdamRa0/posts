import { approvePostService, unapprovePostService } from "@services/posts/approvePostService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useApprovePost() {
    const queryClient = useQueryClient();

    const { mutate: approve } = useMutation({
        mutationFn: approvePostService,
        onSuccess: () => {
            toast.success("Post Approved");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { approve };
}

export function useUnapprovePost() {
    const queryClient = useQueryClient();

    const { mutate: unapprove } = useMutation({
        mutationFn: unapprovePostService,
        onSuccess: () => {
            toast.success("Approval Removed");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { unapprove };
}