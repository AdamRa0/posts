import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgotUsernameService } from "@services/auth/forgotUsernameService";

export function useForgetUsername() {
    const { mutate: forgotUsername } = useMutation({
        mutationFn: forgotUsernameService,
        onError: (error) => toast.error(`${error.message}`)
    });

    return { forgotUsername };
}