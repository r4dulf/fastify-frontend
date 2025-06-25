import { createContext } from "react";

type LoginModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const LoginModalContext = createContext<LoginModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});
