import React, { useState } from "react";
import styles from "@pages/userpage.module.css";
import provideDummyUser, { userData } from "../data/dummyUserData";
import { MdCalendarMonth } from "react-icons/md";
import formatNumber from "@helpers/numericalFormatter";
import ButtonComponent from "@components/ui/ButtonComponent";
import TabComponent from "@components/ui/TabComponent";
import { postsData, provideDummyPosts } from "../data/dummyPostsData";
import ListComponent from "@components/ui/ListComponent";

const user: userData = provideDummyUser();
const posts: postsData[] = provideDummyPosts();

enum TabStates {
  INPOSTS,
  INREPLIES,
  INMEDIA,
  INLIKES,
}

export default function UserPage(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<TabStates>(TabStates.INPOSTS);

  return (
    <>
      <div className={styles.userPageContent}>
        <div className={styles.userPageBanner}>
          <div className={styles.userImages}>
            <div className={styles.userBannerImage}>
              <img src={user.bannerImage} alt="user banner image" />
            </div>
            <div className={styles.userAvatar}>
              <img src={user.avatar} alt="user avatar" />
            </div>
          </div>
          <div className={styles.userDisplayNames}>
            <h4>{user.username}</h4>
            <p>{`@${user.handle}`}</p>
          </div>
          <div className={styles.userOtherInfo}>
            <p>{user.bio}</p>
            <div className={styles.userJoined}>
              <MdCalendarMonth />{" "}
              {user.dateJoined.toLocaleString("en-GB", { month: "long" })}{" "}
              {user.dateJoined.getFullYear()}
            </div>
            <div className={styles.userCommunityCount}>
              <p>
                <span className={styles.count}>
                  {formatNumber(user.subscribed)}
                </span>{" "}
                <span className={styles.countText}>Subscribed-To</span>
              </p>{" "}
              <p>
                <span className={styles.count}>
                  {formatNumber(user.subscribers)}
                </span>{" "}
                <span className={styles.countText}>Subscribers</span>
              </p>
            </div>
          </div>
          <TabComponent>
            <ButtonComponent
              variant="tabButton"
              onClick={() => setCurrentTab(TabStates.INPOSTS)}
            >
              Posts
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
          <ListComponent data={posts} typeOfData="post" />
        </div>
      </div>
    </>
  );
}
