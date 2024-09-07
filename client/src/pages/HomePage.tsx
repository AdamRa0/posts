import styles from "./homepage.module.css";

import { UUID } from "crypto";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import ListComponent from "@components/ui/ListComponent";
import useFetchPosts from "@hooks/useFetchPosts";

export default function HomePage(): React.JSX.Element {
  const { posts, error, status, fetchNextPage, hasNextPage } = useFetchPosts();
  const { ref, inView } = useInView();

  const data = useMemo(() => {
    return posts?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [posts]);

  const parentPosts =
    data?.filter((post: { parent_id: UUID }) => post.parent_id === null) ||
    [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error)
    return (
      <div className={styles.loaderContainer}>
        <p>Could not fetch posts</p>
      </div>
    );

  return (
    <>
      {status === "pending" ? (
        <div className={styles.loaderContainer}>
          <p>Loading...</p>
        </div>
      ) : data.length === 0 ? (
        <div className={styles.container}>
          <p>No posts</p>
        </div>
      ) : (
        <ListComponent data={parentPosts} typeOfData={"post"} reff={ref} />
      )}
    </>
  );
}
