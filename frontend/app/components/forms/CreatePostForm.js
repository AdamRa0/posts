"use client";

import styles from "./createpostform.module.scss";

import { PostUIContext } from "@/app/providers/PostUIProvider";
import Button from "../buttons/Button";

import { useContext, useState } from "react";
import Image from "next/image";
import useGetCSRFAccessToken from "@/app/utils/useGetCSRFAccessToken";
import axios from "axios";

export default function CreatePostForm({ formURL }) {
  const csrfAccessToken = useGetCSRFAccessToken();
  const [post, setPost] = useState();
  const [file, setFile] = useState();
  const { inflatePostUI } = useContext(PostUIContext);

  function handleOnChange(event) {
    setPost(event.target.value);
  }

  function handleOnFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = new FormData();

    form.append("body", post);
    form.append("file", file);

    try {
      const response = await axios.postForm(formURL, form, {
        headers: {
          "X-CSRF-TOKEN": csrfAccessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        inflatePostUI();
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.createPostUI}>
        <form className={styles.postContainer} onSubmit={handleOnSubmit}>
          <textarea
            placeholder="What's on your mind?"
            onChange={handleOnChange}
          />
          <div className={styles.lower}>
            <div className={styles.fileChooser}>
              <Image
                src="/media.svg"
                height={30}
                width={30}
                alt="Choose media icon"
              />
              <input
                type="file"
                accept="images/png, images/gif, images/jpg, images/jpeg"
                onChange={(event) => handleOnFileChange(event)}
              />
            </div>

            <Button text={"Post"} type={"submit"} />
          </div>
        </form>
      </div>
    </>
  );
}
