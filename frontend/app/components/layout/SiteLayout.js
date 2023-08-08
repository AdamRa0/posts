"use client";

import styles from "./sitelayout.module.scss";

import { AuthContext } from "@/app/providers/AuthProvider";
import Loader from "../loader/Loader";
import { Header } from "../header/header";
import DesktopSideNav from "../sidenavs/DesktopSideNav";
import { PostUIContext } from "@/app/providers/PostUIProvider";

import { useContext, useState } from "react";
import Image from "next/image";
import Button from "../buttons/Button";

export default function SiteLayout({ children }) {
  const authenticatedUser = useContext(AuthContext);
  const { inflateUI, inflatePostUI } = useContext(PostUIContext);
  const [post, setPost] = useState();
  const [file, setFile] = useState();

  function handleOnChange(event) {
    setPost(event.target.value);
  }

  function handleOnFileChange(event) {
    setFile(event.target.value);
  }

  if (authenticatedUser === undefined) {
    return (
      <>
        <div className={styles.loadingPageOverlay}>
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      {inflateUI && (
        <div className={styles.createPostUI}>
          <form className={styles.postContainer}>
            <textarea
              placeholder="What's on your mind?"
              onChange={(event) => handleOnChange(event)}
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

              <Button
                text={"Post"}
                type={"submit"}
                handleOnClick={inflatePostUI}
              />
            </div>
          </form>
        </div>
      )}
      <Header
        authenticatedUser={authenticatedUser}
        inflatePostUI={inflatePostUI}
      />
      <main className={styles.siteBody}>
        <DesktopSideNav authenticatedUser={authenticatedUser} />
        {children}
      </main>
    </>
  );
}
