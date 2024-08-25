import getImageService from "@services/media/getImageService";
import { useQuery } from "@tanstack/react-query";

export default function useFetchImage(imagePath: string) {
    const imageUri = imagePath;

    const { isLoading, data: imageBlob } = useQuery({
        queryKey: ["media", imageUri],
        queryFn: () => getImageService(imageUri)
    })

    const image = imageBlob ? URL.createObjectURL(imageBlob) : undefined;

    return { isLoading, image };
}