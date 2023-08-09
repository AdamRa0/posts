import styles from "./postslist.module.scss";
import getPosts from "@/app/services/getPosts";
import PostCard from "../cards/PostCard";
import { useCallback, useRef, useState } from "react";
import Loader from "../loader/Loader";

export default function PostsList() {
  const [pageNumber, setPageNumber] = useState(1);

  const { posts, hasMore, loading, error } = getPosts({
    pageNumber: pageNumber,
  });

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current !== undefined) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((previousPageNo) => previousPageNo + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const postItems = posts.map((post, index) => (
    <li
      key={post.id}
      ref={posts.length === index + 1 ? lastPostElementRef : undefined}
    >
      <PostCard post={post} />
    </li>
  ));

  return (
    <>
      <ul className={styles.contentList}>
        {error && "Error"}
        {postItems.length > 0 && postItems}
        {postItems.length === 0 && "No posts available"}
      </ul>
      <div className={styles.loader}>{loading && <Loader />}</div>
    </>
  );
}
