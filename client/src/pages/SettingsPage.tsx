import React, { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import styles from "./settingspage.module.css";
import ButtonComponent from "../components/ButtonComponent";
import TabComponent from "../components/TabComponent";
import AccountSettingsComponent from "../components/AccountSettingsComponent";
import ProfileSettingsComponent from "../components/ProfileSettingsComponent";

enum TabButtonState {
  INACCOUNT,
  INPROFILE,
  INSAFETY,
}

export default function SettingsPage(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<TabButtonState>(
    TabButtonState.INACCOUNT
  );

  function onTabClick(state: TabButtonState) {
    setCurrentTab(state);
  }

  return (
    <>
      <AppLayout>
        <div className={styles.settingsPageContainer}>
          <h1>User Settings</h1>
          <TabComponent>
            <ButtonComponent
              onClick={() => onTabClick(TabButtonState.INACCOUNT)}
              variant="tabButton"
            >
              Account{" "}
              <span
                className={
                  currentTab === TabButtonState.INACCOUNT ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
            <ButtonComponent
              onClick={() => onTabClick(TabButtonState.INPROFILE)}
              variant="tabButton"
            >
              Profile{" "}
              <span
                className={
                  currentTab === TabButtonState.INPROFILE ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
            <ButtonComponent
              onClick={() => onTabClick(TabButtonState.INSAFETY)}
              variant="tabButton"
            >
              Safety &amp; Privacy{" "}
              <span
                className={
                  currentTab === TabButtonState.INSAFETY ? styles.active : ""
                }
              ></span>
            </ButtonComponent>
          </TabComponent>
          <div className={styles.settingsContent}>
            <h2>
              {currentTab === TabButtonState.INACCOUNT
                ? `Account Settings`
                : currentTab === TabButtonState.INPROFILE
                ? `Profile Settings`
                : `Safety and Privacy Settings`}
            </h2>

            {currentTab === TabButtonState.INACCOUNT ? (
              <AccountSettingsComponent />
            ) : currentTab === TabButtonState.INPROFILE ? (
              <ProfileSettingsComponent />
            ) : (
              <SafetyAndPrivacySettingsComponent />
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
}

function SafetyAndPrivacySettingsComponent(): React.JSX.Element {
  return (
    <>
      <div>Safety &amp; Privacy Settings</div>
    </>
  );
}

