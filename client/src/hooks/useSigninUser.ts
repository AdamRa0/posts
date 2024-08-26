import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signinService } from "@services/auth/signinService";

export function useSigninUser() {

    const queryClient = useQueryClient();

    const { mutate: signIn } = useMutation({
        mutationFn: signinService,
        onSuccess: () => {
            toast.success("Signed in");
            queryClient.invalidateQueries({
                queryKey: ["authenticatedUser"]
            });
        },
        onError: (error) => toast.error(`${error.message}`)
    });

    return { signIn };
}