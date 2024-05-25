import React from "react";
import PageOverlayComponent from "./PageOverlayComponent";
import ModalComponent from "./ModalComponent";

type accountSettingsModalProps = {
  children: React.ReactNode;
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function AccountSettingsModal({
  children,
  closeModal,
}: accountSettingsModalProps): React.JSX.Element {
  return (
    <>
      <PageOverlayComponent>
        <ModalComponent closeModal={closeModal}>
          { children }
        </ModalComponent>
      </PageOverlayComponent>
    </>
  );
}
