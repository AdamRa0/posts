import AccountSettingsModal from "@components/feature/AccountSettingsModal";
import ButtonComponent from "@components/ui/ButtonComponent";
import InputComponent from "@components/ui/InputComponent";

import { useResetPassword } from "@hooks/useResetPassword";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword(): React.JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { userId: id } = useParams();

  const { resetPassword } = useResetPassword();
  const navigate = useNavigate();

  function handleModal() {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  function handleResetPassword(e: { preventDefault: () => void }) {
    e.preventDefault();
    resetPassword({ password, id });
    toast.success("Reset successful. Login with new password");
    navigate('/');
  }

  return (
    <AccountSettingsModal closeModal={handleModal}>
      <form onSubmit={handleResetPassword}>
        <InputComponent
          className={"formInputModal"}
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonComponent variant="modalButtonTwo" type="submit">
          Change Password
        </ButtonComponent>
      </form>
    </AccountSettingsModal>
  );
}
