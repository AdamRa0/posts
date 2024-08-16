import { useEffect, useState } from "react"

import { getUserLikesService } from "@services/user/getUserLikes";
import { PostData } from "types/data/postData"

export default function useGetUserLikes(userId: string): { likes: PostData[] | undefined, error: string | undefined } {
    const [likes, setLikes] = useState<PostData[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        getUserLikesService(userId).then(response => response.json())
            .then(data => setLikes(data))
            .catch(error => {
                console.log(error);
                setError("Could not fetch user's likes");
            });
    }, [userId])

    return { likes, error };
}