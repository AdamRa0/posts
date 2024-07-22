import { PostData } from "../data/postData"

export type PostContextProps = {
    post: PostData | null;
    createPost?: (post: PostData, route: string) => Promise<void>;
    updatePost?: () => void;
    deletePost?: () => void;
    readPost?: () => void;
}