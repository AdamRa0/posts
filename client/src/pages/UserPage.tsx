import { UUID } from "crypto";
import React, { useContext, useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { useParams } from "react-router-dom";

import AvatarComponent from "@components/ui/AvatarComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import TabComponent from "@components/ui/TabComponent";
import ListComponent from "@components/ui/ListComponent";
import BannerComponent from "@components/ui/BannerComponent";
import { AuthContext } from "@contexts/authContext";
import formatNumber from "@helpers/numericalFormatter";
import useFetchUserPosts from "@hooks/useFetchUserPosts";
import styles from "@pages/userpage.module.css";
import { getUserService } from "@services/user/getUserService";
import subscribeToUserService from "@services/user/subscribeToUserService";
import unsubscribeToUserService from "@services/user/unsubscribeToUserService";

import { authContextProp } from "types/props/AuthContextProps";
import { User } from "types/data/userData";

enum TabStates {
  INPOSTS,
  INREPLIES,
  INMEDIA,
  INLIKES,
}

export default function UserPage(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<TabStates>(TabStates.INPOSTS);
  const [appUser, setAppUser] = useState<User | undefined>();
  const [subscribers, setSubscribers] = useState<number>(0);
  const [subscribees, setSubscribees] = useState<number>(0);
  const [isSubscribedToUser, setIsSubscribedToUser] = useState<boolean>(false);
  const { user } = useContext<authContextProp>(AuthContext);
  const { userId } = useParams();
  const { posts: userPosts, error } = useFetchUserPosts(userId!);

  useEffect(() => {
    if (user) {
      if (user.id === userId) {
        setAppUser(JSON.parse(JSON.stringify(user)));
      } else {
        getUserService(undefined, false, userId! as UUID)
          .then((response) => response.json())
          .then((data) => {
            setAppUser({
              id: data.id,
              emailAddress: data.email_address,
              username: data.username,
              handle: data.handle,
              bio: data.bio,
              dateCreated: data.date_created,
              profileImage: data.profile_image,
              bannerImage: data.banner_image,
              isActive: data.is_active,
              isPrivate: data.is_private,
            });
          });
      }

      fetch(
        "/api/v1/users/subscribers?" +
          new URLSearchParams({ "user-id": userId! })
      )
        .then((response) => response.json())
        .then((data) => {
          const { id: authId } = JSON.parse(JSON.stringify(user));
          const { id: subId } = data.find(
            (sub: { id: User }) => sub.id === authId
          );
          setSubscribers(data.length);
          if (authId === subId) setIsSubscribedToUser(true);
        })
        .catch((e) => console.log(e));

      fetch(
        "/api/v1/users/subscribees?" +
          new URLSearchParams({ "user-id": userId! })
      )
        .then((response) => response.json())
        .then((data) => setSubscribees(data.length))
        .catch((e) => console.log(e));
    } else {
      getUserService(undefined, false, userId! as UUID)
        .then((response) => response.json())
        .then((data) => {
          setAppUser({
            id: data.id,
            emailAddress: data.email_address,
            username: data.username,
            handle: data.handle,
            bio: data.bio,
            dateCreated: data.date_created,
            profileImage: data.profile_image,
            bannerImage: data.banner_image,
            isActive: data.is_active,
            isPrivate: data.is_private,
          });
        });
    }
  }, [user, userId]);

  function handleSubscribe() {
    isSubscribedToUser
      ? unsubscribeToUserService(userId!)
      : subscribeToUserService(userId!);
  }

  return (
    <>
      <div className={styles.userPageContent}>
        <div className={styles.userPageBanner}>
          <div className={styles.userImages}>
            <div className={styles.userBannerImage}>
              {appUser === undefined ? (
                <p>Loading...</p>
              ) : (
                <BannerComponent
                  imagePath={
                    appUser.bannerImage !== "default_banner_image.jpg"
                      ? `${userId}_${appUser.bannerImage}`
                      : appUser.bannerImage
                  }
                  altText="user banner"
                />
              )}
            </div>
            <div className={styles.userAvatar}>
              {appUser === undefined ? (
                <p>Loading...</p>
              ) : (
                <AvatarComponent
                  imagePath={
                    appUser.profileImage !== "default_profile_image.jpg"
                      ? `${userId}_${appUser.profileImage}`
                      : appUser.profileImage
                  }
                  altText="user avatar"
                />
              )}
            </div>
          </div>
          <div className={styles.userDisplayNames}>
            <h4>{appUser?.username}</h4>
            <p>{`${appUser?.handle}`}</p>
          </div>
          <div className={styles.userOtherInfo}>
            {user && user.id !== userId && (
              <ButtonComponent variant="followButton" onClick={handleSubscribe}>
                {!isSubscribedToUser ? "Subscribe" : "Unsubscribe"}
              </ButtonComponent>
            )}
            <p>{appUser?.bio}</p>
            <div className={styles.userJoined}>
              <MdCalendarMonth />{" "}
              {appUser &&
                new Date(appUser.dateCreated).toLocaleString("en-GB", {
                  month: "long",
                })}{" "}
              {appUser && new Date(appUser.dateCreated).getFullYear()}
            </div>
            <div className={styles.userCommunityCount}>
              <p>
                <span className={styles.count}>
                  {formatNumber(subscribees)}
                </span>{" "}
                <span className={styles.countText}>Subscribed-To</span>
              </p>{" "}
              <p>
                <span className={styles.count}>
                  {formatNumber(subscribers)}
                </span>{" "}
                <span className={styles.countText}>
                  {subscribers === 1 ? "Subscriber" : "Subscribers"}{" "}
                </span>
              </p>
            </div>
          </div>
          <TabComponent>
            <ButtonComponent
              variant="tabButton"
              onClick={() => setCurrentTab(TabStates.INPOSTS)}
            >
              Board
              <span
                className={
                  currentTab === TabStates.INPOSTS ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
            <ButtonComponent
              variant="tabButton"
              onClick={() => setCurrentTab(TabStates.INREPLIES)}
            >
              Replies
              <span
                className={
                  currentTab === TabStates.INREPLIES ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
            <ButtonComponent
              variant="tabButton"
              onClick={() => setCurrentTab(TabStates.INMEDIA)}
            >
              Media
              <span
                className={
                  currentTab === TabStates.INMEDIA ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
            <ButtonComponent
              variant="tabButton"
              onClick={() => setCurrentTab(TabStates.INLIKES)}
            >
              Likes
              <span
                className={
                  currentTab === TabStates.INLIKES ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
          </TabComponent>
        </div>
        <div className={styles.pageContent}>
          {(!userPosts && error) && <p>Could not fetch posts</p>}
          {(!error && userPosts === undefined) && <p>Loading...</p>}
          {userPosts ? (
            userPosts.length === 0 ? (
              <p>User hasn&apos;t posted yet</p>
            ) : (
              <ListComponent data={userPosts} typeOfData="post" />
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
