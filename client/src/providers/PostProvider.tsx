import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "@contexts/postContext";
import useFetchPost from "@hooks/useFetchPost";
import useUpdatePost from "@hooks/useUpdatePost";
import useDeletePost from "@hooks/useDeletePost";
import { PostContextProviderProps } from "types/props/PostContextProps";
import { PostData } from "types/data/postData";
import { UUID } from "crypto";

export default function PostContextProvider({
  children,
}: PostContextProviderProps) {

  const { postId } = useParams();
  const { post, isLoading } = useFetchPost(postId!);

  const commentsById = useMemo(() => {
    const comments = {};
    post?.children?.forEach((comment) => {
      comments[comment?.parent_id] ||= [];
      comments[comment?.parent_id].push(comment);
    });
    return comments;
  }, [post]);

  function getReplies(id: UUID): PostData[] {
    return commentsById[id] as PostData[];
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <PostContext.Provider
        value={{
          post,
          replies: getReplies,
          updatePost: useUpdatePost,
          deletePost: useDeletePost,
        }}
      >
        {children}
      </PostContext.Provider>
    </>
  );
}
