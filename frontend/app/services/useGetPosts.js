import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetPosts({ pageNumber }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const postsURL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: "GET",
      url: postsURL,
      params: { _page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setPosts((previousPosts) => {
          return [
            ...new Set([
              ...previousPosts,
              ...response.data.map((post) => post.body),
            ]),
          ];
        });

        setHasMore(response.data.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });

    return () => cancel();
  }, [pageNumber]);

  return { loading, error, posts, hasMore };
}
