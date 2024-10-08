import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserDetailsService } from "@services/user/updateUserDetails";

export function useChangeDetails() {
    const queryClient = useQueryClient();

    const { mutate: changeDetails } = useMutation({
        mutationFn: ({ email, handle, username }: { email?: string, handle?: string, username?: string }) => updateUserDetailsService(email, handle, username),
        onSuccess: () => {
            toast.success("Details updated"),
                queryClient.invalidateQueries({
                    queryKey: ["authenticatedUser"],
                });
        },
        onError: (error) => toast.error(error.message),
    });

    return { changeDetails };
}