import getImageService from "@services/media/getImageService";
import { useState, useEffect } from "react";

export default function useFetchImage(imagePath: string) {
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        getImageService(imagePath)
            .then((response) => response.blob())
            .then((imageBlob) => {
                const imageURL = URL.createObjectURL(imageBlob);
                setImage(imageURL);
            });
    }, [imagePath]);


    return image;
}