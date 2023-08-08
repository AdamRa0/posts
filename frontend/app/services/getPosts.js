import { useEffect, useState } from "react";
import axios from "axios";

export default function getPosts({ pageNumber }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const postsURL = "/api/v1/posts";

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: "GET",
      url: postsURL,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setPosts((previousPosts) => {
          return [...new Set([...previousPosts, ...response.data])];
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
