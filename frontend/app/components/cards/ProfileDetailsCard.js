"use client";

import styles from "./profiledetailscard.module.scss";

import Image from "next/image";

import Button from "../buttons/Button";

import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";

export default function ProfileDetailsCard({ user }) {
  const authenticatedUser = useContext(AuthContext);

  return (
    <>
      <section className={styles.profileDetails}>
        <div className={styles.bannerImage}>
          <Image
            src={`/api/v1/users/media/${user.banner_image}`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="User banner image"
          />
        </div>
        <div className={styles.profileAvatar}>
          <Image
            src={`/api/v1/users/media/${user.profile_image}`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="User profile image"
          />
        </div>
        {authenticatedUser === user ? (
          <div></div>
        ) : (
          <Button text={"Subscribe"} />
        )}
        <div className={styles.userDetails}>
          <h3 tabIndex={0}>{user.username} </h3>
          <h4 tabIndex={0}>{user.handle} </h4>
          <p>{user.bio}</p>
        </div>
        <div className={styles.userNetwork}>
          <div tabIndex={0}>
            <h3>200</h3>
            <p>Subscribers</p>
          </div>
          <div tabIndex={0}>
            <h3>500</h3>
            <p>Subscribees</p>
          </div>
        </div>
      </section>
    </>
  );
}
