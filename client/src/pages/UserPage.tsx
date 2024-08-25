import { UUID } from "crypto";
import React, { useContext, useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AvatarComponent from "@components/ui/AvatarComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import TabComponent from "@components/ui/TabComponent";
import ListComponent from "@components/ui/ListComponent";
import BannerComponent from "@components/ui/BannerComponent";
import { AuthContext } from "@contexts/authContext";
import formatNumber from "@helpers/numericalFormatter";
import useFetchUserPosts from "@hooks/useFetchUserPosts";
import useGetUserLikes from "@hooks/useGetUserLikes";
import useFetchUserMedia from "@hooks/useFetchUserMedia";
import useFetchUserReplies from "@hooks/useFetchUserReplies";
import styles from "@pages/userpage.module.css";
import { getUserService } from "@services/user/getUserService";
import subscribeToUserService from "@services/user/subscribeToUserService";
import unsubscribeToUserService from "@services/user/unsubscribeToUserService";

import { authContextProp } from "types/props/AuthContextProps";
import { User } from "types/data/userData";
import useFetchUserSubscribers from "@/hooks/useFetchUserSubscribers";
import useFetchUserSubscribees from "@/hooks/useFetchUserSubscribees";

enum TabStates {
  INPOSTS,
  INREPLIES,
  INMEDIA,
  INLIKES,
}

export default function UserPage(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<TabStates>(TabStates.INPOSTS);
  const [appUser, setAppUser] = useState<User | undefined>();
  const { user } = useContext<authContextProp>(AuthContext);

  const { userId } = useParams();

  const { isLoading, userPosts, error } = useFetchUserPosts(userId!);
  const {
    isLoading: likesLoading,
    likes,
    error: likesError,
  } = useGetUserLikes(userId!);
  const {
    isLoading: repliesLoading,
    replies,
    error: repliesError,
  } = useFetchUserReplies(userId!);
  const {
    mediaLoading,
    postsWithMedia: media,
    mediaError,
  } = useFetchUserMedia(userId!);

  const { subscribers, subscribersError } = useFetchUserSubscribers(userId!);

  const { subscribees, subscribeesError } = useFetchUserSubscribees(userId!);

  if (subscribersError) toast.error(subscribersError.message);

  if (subscribeesError) toast.error(subscribeesError.message);

  const isSubscribedToUser = subscribees.find((subscribee) => subscribee.id === userId);

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
                  {formatNumber(subscribees.length)}
                </span>{" "}
                <span className={styles.countText}>Subscribed-To</span>
              </p>{" "}
              <p>
                <span className={styles.count}>
                  {formatNumber(subscribers.length)}
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
          {/* Posts Tab */}
          {currentTab === TabStates.INPOSTS && error && <p>{error.message}</p>}
          {currentTab === TabStates.INPOSTS && isLoading && <p>Loading...</p>}
          {currentTab === TabStates.INPOSTS && userPosts ? (
            userPosts.length === 0 ? (
              <p>User hasn&apos;t posted yet</p>
            ) : (
              <ListComponent data={userPosts} typeOfData="post" />
            )
          ) : null}
          {/* Likes Tab */}
          {currentTab === TabStates.INLIKES && likesError && (
            <p>{likesError.message}</p>
          )}
          {currentTab === TabStates.INLIKES && likesLoading && (
            <p>Loading...</p>
          )}
          {currentTab === TabStates.INLIKES && likes ? (
            likes.length === 0 ? (
              <p>User has no likes</p>
            ) : (
              <ListComponent data={likes} typeOfData="post" />
            )
          ) : null}
          {/* Replies Tab */}
          {currentTab === TabStates.INREPLIES && repliesError && (
            <p>{repliesError.message}</p>
          )}
          {currentTab === TabStates.INREPLIES && repliesLoading && (
            <p>Loading...</p>
          )}
          {currentTab === TabStates.INREPLIES && replies ? (
            replies.length === 0 ? (
              <p>User has no likes</p>
            ) : (
              <ListComponent data={replies} typeOfData="post" />
            )
          ) : null}
          {/* Media Tab */}
          {currentTab === TabStates.INMEDIA && mediaError && (
            <p>{mediaError.message}</p>
          )}
          {currentTab === TabStates.INMEDIA && mediaLoading && (
            <p>Loading...</p>
          )}
          {currentTab === TabStates.INMEDIA && media ? (
            media.length === 0 ? (
              <p>User has no media</p>
            ) : (
              <ListComponent data={media} typeOfData="post" />
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
