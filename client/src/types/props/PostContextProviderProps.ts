import { UseMutateFunction } from "@tanstack/react-query";
import { UUID } from "crypto";
import { PostData } from "types/data/postData"

export type PostContextProps = {
    post: Response | undefined;
    postImage: string;
    replies: (id: UUID) => PostData[];
    updatePost?: (postId: UUID, body: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deletePost?: UseMutateFunction<any, Error, {
        postId: UUID;
    }, unknown>;
}