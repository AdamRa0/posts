import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "@contexts/postContext";
import useFetchPost from "@hooks/useFetchPost";
import useUpdatePost from "@hooks/useUpdatePost";
import useDeletePost from "@hooks/useDeletePost";
import createPostService from "@services/posts/createPostService";
import { PostContextProviderProps } from "types/props/PostContextProps";
import { PostData } from "types/data/postData";
import { UUID } from "crypto";

async function createPost(post: PostData, route: string) {
  await createPostService(post, route);
}

export default function PostContextProvider({
  children,
}: PostContextProviderProps) {
  const [body, setBody] = useState<PostData | undefined>();
  const [image, setImage] = useState<string>();

  const { postId } = useParams();
  const { post, postImage } = useFetchPost(postId!);

  useEffect(() => {
    setBody(post);
    setImage(postImage);
  }, [post, postImage]);

  const commentsById = useMemo(() => {
    const comments = {};
    body?.children?.forEach((comment) => {
      comments[comment?.parent_id] ||= [];
      comments[comment?.parent_id].push(comment);
    });
    return comments;
  }, [body?.children]);

  function getReplies(id: UUID): PostData[] {
    return commentsById[id] as PostData[];
  }

  if (body === undefined) return <p>Loading...</p>;

  return (
    <>
      <PostContext.Provider
        value={{
          post: body!,
          postImage: image!,
          replies: getReplies,
          createPost: createPost,
          updatePost: useUpdatePost,
          deletePost: useDeletePost,
        }}
      >
        {children}
      </PostContext.Provider>
    </>
  );
}
