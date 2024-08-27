import React, { useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AvatarComponent from "@components/ui/AvatarComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import TabComponent from "@components/ui/TabComponent";
import ListComponent from "@components/ui/ListComponent";
import BannerComponent from "@components/ui/BannerComponent";
import formatNumber from "@helpers/numericalFormatter";
import useFetchUserPosts from "@hooks/useFetchUserPosts";
import useGetUserLikes from "@hooks/useGetUserLikes";
import useFetchUserMedia from "@hooks/useFetchUserMedia";
import useFetchUserReplies from "@hooks/useFetchUserReplies";
import useFetchUserSubscribers from "@hooks/useFetchUserSubscribers";
import useFetchUserSubscribees from "@hooks/useFetchUserSubscribees";
import useGetUser, { useGetAuthenticatedUser } from "@hooks/useGetUser ";
import styles from "@pages/userpage.module.css";
import unsubscribeToUserService from "@services/user/unsubscribeToUserService";
import subscribeToUserService from "@services/user/subscribeToUserService";

enum TabStates {
  INPOSTS,
  INREPLIES,
  INMEDIA,
  INLIKES,
}

export default function UserPage(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<TabStates>(TabStates.INPOSTS);
  const { authenticatedUser } = useGetAuthenticatedUser();

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

  const { appUser, appUserLoading } = useGetUser(userId!);

  const { subscribersLoading, subscribers, subscribersError } =
    useFetchUserSubscribers(userId!);

  const { subscribeesLoading, subscribees, subscribeesError } =
    useFetchUserSubscribees(userId!);

  if (subscribersError) toast.error(subscribersError.message);

  if (subscribeesError) toast.error(subscribeesError.message);

  const isSubscribedToUser = subscribees.find(
    (subscribee) => subscribee.id === userId
  );

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
              {appUserLoading ? (
                <p>Loading...</p>
              ) : (
                <BannerComponent
                  imagePath={
                    appUser.banner_image !== "default_banner_image.jpg"
                      ? `${userId}_${appUser.banner_image}`
                      : appUser.banner_image
                  }
                  altText="user banner"
                />
              )}
            </div>
            <div className={styles.userAvatar}>
              {appUserLoading ? (
                <p>Loading...</p>
              ) : (
                <AvatarComponent
                  imagePath={
                    appUser.profile_image !== "default_profile_image.jpg"
                      ? `${userId}_${appUser.profile_image}`
                      : appUser.profile_image
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
            {authenticatedUser && authenticatedUser.id !== userId && (
              <ButtonComponent variant="followButton" onClick={handleSubscribe}>
                {!isSubscribedToUser ? "Subscribe" : "Unsubscribe"}
              </ButtonComponent>
            )}
            <p>{appUserLoading ? "" : appUser.bio}</p>
            <div className={styles.userJoined}>
              <MdCalendarMonth />{" "}
              {appUser &&
                new Date(appUser.date_created).toLocaleString("en-GB", {
                  month: "long",
                })}{" "}
              {appUser && new Date(appUser.date_created).getFullYear()}
            </div>
            <div className={styles.userCommunityCount}>
              <p>
                <span className={styles.count}>
                  {subscribeesLoading ? 0 : formatNumber(subscribees.length)}
                </span>{" "}
                <span className={styles.countText}>Subscribed-To</span>
              </p>{" "}
              <p>
                <span className={styles.count}>
                  {subscribersLoading ? 0 : formatNumber(subscribers.length)}
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
