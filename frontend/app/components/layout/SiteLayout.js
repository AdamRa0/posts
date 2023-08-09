"use client";

import styles from "./sitelayout.module.scss";

import { AuthContext } from "@/app/providers/AuthProvider";
import Loader from "../loader/Loader";
import { Header } from "../header/header";
import DesktopSideNav from "../sidenavs/DesktopSideNav";
import { PostUIContext } from "@/app/providers/PostUIProvider";

import { useContext } from "react";
import CreatePostForm from "../forms/CreatePostForm";

export default function SiteLayout({ children }) {
  const authenticatedUser = useContext(AuthContext);
  const { inflateUI, inflatePostUI } = useContext(PostUIContext);

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
      {inflateUI && <CreatePostForm formURL={"/api/v1/posts/create_post"} />}
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
