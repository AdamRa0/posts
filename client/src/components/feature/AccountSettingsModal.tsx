import React from "react";
import PageOverlayComponent from "@components/ui/PageOverlayComponent";
import ModalComponent from "@components/ui/ModalComponent";

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
        <ModalComponent closeModal={closeModal}>{children}</ModalComponent>
      </PageOverlayComponent>
    </>
  );
}
