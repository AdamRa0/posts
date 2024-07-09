import { PostData } from "types/data/postData";
import { useEffect, useState } from "react";
import fetchPostService from "@services/posts/fetchPostService";

export default function useFetchPost(postId: string) {
    const [postImage, setPostImage] = useState<string>("");
    const [post, setPost] = useState<PostData | undefined>();

    useEffect(() => {
        fetchPostService(postId!)
            .then((response) => response.json())
            .then((data) => {
                setPost(data);
                if (data.post_file) setPostImage(data.post_file);
            });
    }, [postId]);

    return { post, postImage }
}