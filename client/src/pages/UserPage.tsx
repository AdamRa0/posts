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
import styles from "@pages/userpage.module.css";

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
  const [bannerImg, setBannerImg] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [subscribers, setSubscribers] = useState<number>(0);
  const [subscribees, setSubscribees] = useState<number>(0);
  const { user } = useContext<authContextProp>(AuthContext);
  const { userId } = useParams();

  useEffect(() => {
    if (user) {
      setAppUser(JSON.parse(JSON.stringify(user)));
      setProfileImg(JSON.parse(JSON.stringify(user)).profileImage);
      setBannerImg(JSON.parse(JSON.stringify(user)).bannerImage);

      fetch(
        "/api/v1/users/subscribers?" +
          new URLSearchParams({ "user-id": userId! })
      )
        .then((response) => response.json())
        .then((data) => setSubscribers(data.length))
        .catch((e) => console.log(e));


      fetch(
        "/api/v1/users/subscribees?" +
          new URLSearchParams({ "user-id": userId! })
      )
        .then((response) => response.json())
        .then((data) => setSubscribees(data.length))
        .catch((e) => console.log(e));
    }
  }, [user, userId]);

  return (
    <>
      <div className={styles.userPageContent}>
        <div className={styles.userPageBanner}>
          <div className={styles.userImages}>
            <div className={styles.userBannerImage}>
              <BannerComponent
                imagePath={
                  bannerImg !== "default_banner_image.jpg"
                    ? `${userId}_${bannerImg}`
                    : bannerImg
                }
                altText="user avatar"
              />
            </div>
            <div className={styles.userAvatar}>
              <AvatarComponent
                imagePath={
                  profileImg !== "default_profile_image.jpg"
                    ? `${userId}_${profileImg}`
                    : profileImg
                }
                altText="user avatar"
              />
            </div>
          </div>
          <div className={styles.userDisplayNames}>
            <h4>{appUser?.username}</h4>
            <p>{`${appUser?.handle}`}</p>
          </div>
          <div className={styles.userOtherInfo}>
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
          <ListComponent data={[]} typeOfData="post" />
        </div>
      </div>
    </>
  );
}
