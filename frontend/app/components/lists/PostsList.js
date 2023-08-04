import styles from "./postslist.module.scss";
import useGetPosts from "@/app/services/useGetPosts";
import PostCard from "../cards/PostCard";
import { useCallback, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import Loader from "../loader/Loader";

export default function PostsList() {
  const [pageNumber, setPageNumber] = useState(1);

  const { posts, hasMore, loading, error } = useGetPosts({
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
      key={faker.finance.routingNumber()}
      ref={posts.length === index + 1 ? lastPostElementRef : undefined}
    >
      <PostCard post={post} postIndex={index} />
    </li>
  ));

  return (
    <ul className={styles.contentList}>
      {postItems}
      <div className={styles.loader}>{loading && <Loader />}</div>
      <div>{error && "Error"}</div>
    </ul>
  );
}
