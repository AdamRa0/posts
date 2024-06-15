import { ReactNode } from "react";

export type ModalComponentProps = {
    children: ReactNode;
    closeModal: (event: React.MouseEvent<HTMLElement>) => void;
    isVisible?: boolean;
    goBack?: (event: React.MouseEvent<HTMLElement>) => void;
    variant?: string;
};