"use client";

import styles from "./profiledetailscard.module.scss";

import Image from "next/image";

import Button from "../buttons/Button";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";
import useGetCSRFAccessToken from "@/app/hooks/useGetCSRFAccessToken";

export default function ProfileDetailsCard({ user }) {
  const authenticatedUser = useContext(AuthContext);

  const csrf_access_cookie = useGetCSRFAccessToken();
  const [subscribers, setSubscribers] = useState();
  const [subscribees, setSubscribees] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/users/subscribers`, {
        headers: {
          "X-CSRF-TOKEN": csrf_access_cookie,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setSubscribers(response.data.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/v1/users/subscribees`, {
        headers: {
          "X-CSRF-TOKEN": csrf_access_cookie,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setSubscribees(response.data.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <>
      <section className={styles.profileDetails}>
        <div className={styles.bannerImage}>
          <Image
            src={`/api/v1/users/media/${user.banner_image}`}
            width={0}
            height={270}
            sizes="100vw"
            style={{ width: "100%" }}
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
            <h3>{subscribers}</h3>
            <p>Subscribers</p>
          </div>
          <div tabIndex={0}>
            <h3>{subscribees}</h3>
            <p>Subscribees</p>
          </div>
        </div>
      </section>
    </>
  );
}
