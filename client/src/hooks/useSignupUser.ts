import { signupService } from "@services/auth/signupService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export function useSignupUser() {

    const queryClient = useQueryClient();

    const { mutate: signUp } = useMutation({
        mutationFn: signupService,
        onSuccess: () => {
            toast.success("Signed up");
            queryClient.invalidateQueries({
                queryKey: ["authenticatedUser"]
            });
        },
        onError: (error) => toast.error(`${error.message}`)
    });

    return { signUp };
}