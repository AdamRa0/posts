import useGetCSRFAccessToken from "../utils/useGetCSRFAccessToken";

import axios from "axios";

import { useEffect, useState } from "react";

export default function createPost({ url, postBody, postFile }) {
  const csrfAccessToken = useGetCSRFAccessToken();
  const [post, setPost] = useState();
  const form = new FormData();
  let cancel;

  form.append("body", postBody);

  if (postFile !== undefined) form.append("file", postFile);

  useEffect(() => {
    axios
      .postForm(url, form, {
        headers: {
          "X-CSRF-TOKEN": csrfAccessToken,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(function (response) {
        console.log(response.data);
        setPost({
          ...response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => cancel();
  }, []);

  return post;
}
