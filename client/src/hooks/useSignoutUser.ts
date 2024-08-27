import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { signoutService } from "@services/auth/signoutService";

export function useSignOutUser() {
    const queryClient = useQueryClient();

    const { mutate: signOut } = useMutation({
        mutationFn: signoutService,
        onSuccess: () => {
            toast.success("Signed out");
            queryClient.resetQueries({
                queryKey: ["authenticatedUser"],
            });
        },
        onError: (error) => toast.error(`${error.message}`)
    });

    return { signOut };
}