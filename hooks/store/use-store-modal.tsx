import { create } from "zustand";

interface ModalState {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isDataRegisterOpen: boolean;
  openDateRegister: () => void;
  closeDataRegister: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLoginOpen: false,
  isDataRegisterOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  openDateRegister: () => set({ isDataRegisterOpen: true }),
  closeDataRegister: () => set({ isDataRegisterOpen: false }),
}));
