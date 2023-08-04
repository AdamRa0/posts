"use client";

import styles from "./settings.module.scss";
import createUUID from "../utils/clientUUIDGenerator";
import SiteLayout from "../components/layout/SiteLayout";

import { AuthContext } from "../providers/AuthProvider";

import { useState, useContext } from "react";
import Loader from "../components/loader/Loader";
import { useRouter } from "next/navigation";
import AccountSettings from "../components/settings/AccountSettings";
import PrivacyAndSecurity from "../components/settings/PrivacyAndSecurity";
import DeletionAndDeactivation from "../components/settings/DeletionAndDeactivation";

export default function Settings() {
  const authenticatedUser = useContext(AuthContext);
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    "Account Settings",
    "Privacy & Security",
    "Account Deletion & Deactivation",
  ];

  function SettingsTabs({ activeTabIndex }) {
    const tabItems = tabs.map((tab, index) => (
      <li
        key={createUUID()}
        className={activeTabIndex === index ? styles.activeTabItem : ""}
        onClick={() => setTabIndex(index)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setTabIndex(index);
          }
        }}
      >
        {tab}
      </li>
    ));

    return <ul>{tabItems}</ul>;
  }

  if (authenticatedUser === undefined) {
    return (
      <div className={styles.loadingPageOverlay}>
        <Loader />
      </div>
    );
  }

  if (authenticatedUser === null) {
    return <>{router.push("/auth/login")}</>;
  }

  return (
    <SiteLayout>
      <section className={styles.settingsBody}>
        <div className={styles.settingsContent}>
          <div className={styles.titleAndTabs}>
            <div className={styles.title}>
              <h1>User Settings</h1>
            </div>
            <div className={styles.tabs}>
              <SettingsTabs activeTabIndex={tabIndex} />
            </div>
          </div>
          <div className={styles.tabContent}>
            {tabIndex === 0 && <AccountSettings />}
            {tabIndex === 1 && <PrivacyAndSecurity />}
            {tabIndex === 2 && <DeletionAndDeactivation />}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
