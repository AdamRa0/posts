import axios from "axios";

import { useEffect, useState } from "react";

export default function getPostAuthorDetails({ authorID }) {
  const [postAuthor, setPostAuthor] = useState({});
  let cancel;

  useEffect(() => {
    axios
      .get("/api/v1/users/profile", {
        params: { "user-id": authorID },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(function (response) {
        const { username, handle, profile_image } = response.data;
        setPostAuthor({
          username,
          handle,
          profile_image,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => cancel();
  });

  return { postAuthor };
}
