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
        response.data.length === 20 ? setHasMore(true) : setHasMore(false);
        setLoading(false);
        setPosts((previousPosts) => {
          return [...new Set([...previousPosts, ...response.data])];
        });
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        if (axios.isCancel(error)) return;
      });

    return () => cancel();
  }, [pageNumber]);

  return { loading, error, posts, hasMore };
}
