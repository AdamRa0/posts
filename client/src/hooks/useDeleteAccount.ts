import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import deleteUserService from "@services/user/deleteUserService";

export function useDeleteAccount() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: deleteAccount } = useMutation({
        mutationFn: deleteUserService,
        onSuccess: () => {
            toast.success("Account deleted");
            queryClient.resetQueries({
                queryKey: ["authenticatedUser"],
            });
            navigate("/");
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    return { deleteAccount };
}