import { UUID } from "crypto";
import { PostData } from "types/data/postData"

export type PostContextProps = {
    post: PostData | null;
    postImage: string;
    replies: (id: UUID) => PostData[];
    createPost?: (post: PostData, route: string) => Promise<void>;
    updatePost?: (postId: UUID, body: string) => string;
    deletePost?: (postId: UUID) => string;
}