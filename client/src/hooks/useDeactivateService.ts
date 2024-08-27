import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "@contexts/authContext";
import deactivateUserService from "@services/user/deactivateUserService";

export function useDeactivateService() {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const { mutate: deactivateAccount } = useMutation({
        mutationFn: deactivateUserService,
        onSuccess: () => {
            signOut!();
            toast.success("Deactivation successfull. Login to activate");
            navigate("/");
        },
        onError: (error) => toast.error(error.message),
    });

    return { deactivateAccount }
}