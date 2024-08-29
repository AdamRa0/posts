import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserImagesService } from "@services/user/updateUserImages";

export function useUpdateImage() {

    const queryClient = useQueryClient();

    const { mutate: updateImage } = useMutation({
        mutationFn: ({ profileImg, bannerImg }: { profileImg?: File, bannerImg?: File }) =>
            updateUserImagesService(profileImg, bannerImg),
        onSuccess: () => {
            toast.success("Image(s) updated");
            queryClient.invalidateQueries({
                queryKey: ["authenticatedUser"]
            });
        },
        onError: (error) => toast.error(`${error.message}`)
    });

    return { updateImage };
}